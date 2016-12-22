var _babel;
var _utils;

module.exports	= {
	compile: function(source, path, config){
		if (_babel == null) {
			_babel = require('babel-core');
			_utils = require('atma-utils');

			require('babel-polyfill');
		}
		
		var uri = new _utils.class_Uri(path),
			filename = uri.toLocalFile();
		
		if (config.sourceMap == null) 
			config.sourceMap = true;

		var options = _defaults(_clone(config.babel), {
			filename: filename,
		});
		
		var compiled = _compile(source, options),	
			errors = compiled.errors == null || compiled.errors.length === 0
				? null
				: 'throw Error("Babel '
					+ compiled.errors.join('\\\n').replace(/"/g, '\\"').replace(/\n/g, '\\n')
					+ '");'
			;
		
		if (errors) {
			console.error('Babel Error for "' + filename + '"\n' + compiled.errors.join('\n'));
			return {
				content: errors,
				sourceMap: errors
			};
		}
		if (options.sourceMaps === false) {
			return {
				content: compiled.js,
				sourceMap: null
			};
		}
		var js = compiled.js,
			sourceMap = compiled.sourceMap || compiled.generatedSourceMap;
		if (sourceMap) 
			js += '\n//# sourceMappingURL=' + uri.file + '.map';
		
		return {
			content: js,
			sourceMap: sourceMap
		};
	}
};

function _defaults(target, source){
	if (target == null) 
		return source;
	for(var key in source){
		if (key in target === false) 
			target[key] = source[key];
	}
	return target;
}
function _clone(source){
	var out = {};
	for (var key in source) {
		out[key] = source[key];
	} 
	return out;
}
function _compile(source, options) {
	try {
		if (options && 'highlightCode' in options === false) {
			options.highlightCode = false;
		}
		
		var compiled = _babel.transform(source, options);
		var sourceMap = compiled.map;
		if (sourceMap != null && typeof sourceMap !== 'string') 
			sourceMap = JSON.stringify(sourceMap, null, 4);
		return {
			js: compiled.code,
			sourceMap: sourceMap
		};
	} catch (error) {		
		throw new Error(error.message + '\n' + error.codeFrame);
	}
}
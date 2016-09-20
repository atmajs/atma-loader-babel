var _babel;
var _utils;

module.exports	= {
	compile: function(source, path, config){
		if (_babel == null) {
			_babel = require('babel');
			_utils = require('atma-utils');

			require("babel/polyfill");
		}
		
		var uri = new _utils.class_Uri(path),
			filename = uri.toLocalFile();
		
		if (config.sourceMap == null) 
			config.sourceMap = true;

		var options = _defaults(config.babel, {
			script: true,
			sourceMaps: config.sourceMap
		});
		
		var compiled = _compile(source, options, filename),	
			errors = compiled.errors == null || compiled.errors.length === 0
				? null
				: 'throw Error("Babel '
					+ compiled.errors.join('\\\n').replace(/"/g, '\\"')
					+ '");'
			;
		
		if (errors) {
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
function _compile(source, options, filename) {
	try {
		options.script = true;
		
		var compiled = _babel.transform(source, {
			filename: filename,
			sourceMap: Boolean(options.sourceMap || options.sourceMaps)
		}); 

		var sourceMap = compiled.map;
		if (sourceMap != null) 
			sourceMap = JSON.stringify(sourceMap, null, 4);
		return {
			js: compiled.code,
			sourceMap: sourceMap
		};
	} catch(errors) {
		if (errors.length == null) 
			errors = [errors];
		return {
			errors: errors
		};
	}
}
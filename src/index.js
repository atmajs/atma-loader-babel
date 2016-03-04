(function(){
	
	var Loader;
	(function(module){
		//import /node_modules/atma-loader/index.js
	}(Loader = {}));
	
	if (Loader.exports == null) {
		return;
	}
	
	var Compiler;
	(function(module){
		// import compiler.js
	}(Compiler = {}));

	if (Compiler.exports == null) {
		return;
	}
	
	(function(){
		
		include.exports = Loader.exports.create({
			name: 'atma-loader-babel',
			options: {
				mimeType: 'text/javascript',
				extensions: [ 'es6' ]
			},
		}, Compiler.exports)
		
	}());
	
	// stacktraces
	require('atma-loader-stacktrace')();
}());
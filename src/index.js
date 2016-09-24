(function(){
	"use strict";

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
	
	(function(module){
		
		module.exports = Loader.exports.create({
			name: 'atma-loader-babel',
			options: {
				mimeType: 'text/javascript',
				extensions: [ 'es6' ]
			},
		}, Compiler.exports)
		
	}(typeof include !== 'undefined' ? include : module));
	
	// stacktraces
	require('atma-loader-stacktrace')();
}());
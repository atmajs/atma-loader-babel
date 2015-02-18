[Babel (6to5) Compiler](https://babeljs.io) (Atma Plugin)
-----
[![Build Status](https://travis-ci.org/atmajs/atma-loader-babel.png?branch=master)](https://travis-ci.org/atmajs/atma-loader-babel)

_with proper stacktrace support_

The Plugin extends:
- [`IncludeJS`](https://github.com/atmajs/IncludeJS) with a custom loader
- [`atma-io`](https://github.com/atmajs/atma-io) with a custom middleware to read ES6 files
- [`atma-server`](https://github.com/atmajs/atma-server) and [`Atma Toolkit`](https://github.com/atmajs/Atma.Toolkit) with a `HTTPHandler` to serve compiled sources (with **sourceMap** support)



##### How to use

###### Embed into the Project

+ `atma plugin install atma-loader-babel`

	This adds `atma-loader-babel` npm dependency and the `package.json` would look like:
    ```json
        {
            "dependencies": {
                "atma-loader-babel"
            },
            "atma": {
                "plugins": [
                    "atma-loader-babel"
                ],
                "settings": {
					"atma-loader-babel": {
						"extensions" : [ "es6" ]
						"babel": {} // babel-compiler options
					}
                }
            }
        }
    ```
+ That's all. Now, you are ready to use the 'next javascript' in your project

##### Quick Try

+ install atma: `$ npm install atma -g`
+ install plugin: `$ atma plugin install atma-loader-babel --save`
+ add `test.html` to the directory

    ```html
    <!DOCTYPE html>
    <script src='test.es6'></script>
    ```
+ add `test.es6`
    
    ```javascript
    setInterval(() => document.body.textContent += ".. itworks ..", 200);
    ```
+ start the server: `$ atma server`
+ open the browser: `http://localhost:5777/test.html`



----
The MIT License
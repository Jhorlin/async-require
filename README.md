# async-require
[![Build Status](https://travis-ci.org/Jhorlin/async-require.svg?branch=master)](https://travis-ci.org/Jhorlin/async-require)
[![Coverage Status](https://coveralls.io/repos/Jhorlin/async-require/badge.svg)](https://coveralls.io/r/Jhorlin/async-require)
[![Dependency Status](https://david-dm.org/jhorlin/async-require.svg)](https://david-dm.org/jhorlin/async-require)
[![devDependency Status](https://david-dm.org/jhorlin/async-require/dev-status.svg)](https://david-dm.org/jhorlin/async-require#info=devDependencies)
    <a name="module_async-require"></a>
## async-require
asyncronous module loader

**Example**  
```js//ironically loading async-require using syncronaous require.var asyncRequire = require('async-require');```

* [async-require](#module_async-require)
  * [requireAsync(module)](#exp_module_async-require--requireAsync) ⇒ <code>Promise.&lt;(module\|Error)&gt;</code> ⏏
    * [~load - A promisified function that accepts a moduleId as an argument and returns a promise resolving in an object with a toString method such as a Buffer or a String.()](#module_async-require--requireAsync..load - A promisified function that accepts a moduleId as an argument and returns a promise resolving in an object with a toString method such as a Buffer or a String.)

<a name="exp_module_async-require--requireAsync"></a>
### requireAsync(module) ⇒ <code>Promise.&lt;(module\|Error)&gt;</code> ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>string</code> | the path to the module without a .js extension |

**Example**  
```js//load script myModule.jsasyncRequire('myModule').then(function(module){  //module has been exported});```
<a name="module_async-require--requireAsync..load - A promisified function that accepts a moduleId as an argument and returns a promise resolving in an object with a toString method such as a Buffer or a String."></a>
#### requireAsync~load - A promisified function that accepts a moduleId as an argument and returns a promise resolving in an object with a toString method such as a Buffer or a String.()
load is used by async-require to load the script. By default it load a file relative to the calling modulesimilar to how require works when loading module not installed through npm. Since this function is public you canset a new load method.

**Kind**: inner method of <code>[requireAsync](#exp_module_async-require--requireAsync)</code>  
**Access:** public  
**Example**  
load a script with request```jsvar asyncRequire = require('async-require'),    request = require('request'),    Promise = require('promise'),    //load must return a promise    get = Promise.promisify(request.get);    //overwrite the default load    asyncRequire.load = function(url){         //get the script         return get(url).spread(function(res, body){             //returrn only the body of the script             return body;         })    }```

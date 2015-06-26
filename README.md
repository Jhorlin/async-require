# async-require
[![Build Status](https://travis-ci.org/Jhorlin/async-require.svg?branch=master)](https://travis-ci.org/Jhorlin/async-require)
[![Coverage Status](https://coveralls.io/repos/Jhorlin/async-require/badge.svg)](https://coveralls.io/r/Jhorlin/async-require)
    <a name="module_async-require"></a>
## async-require
asyncronous module loader

**Example**  
```js//ironically loading async-require using syncronaous require.var asyncRequire = require('async-require');```

* [async-require](#module_async-require)
  * [requireAsync(module)](#exp_module_async-require--requireAsync) ⇒ <code>Promise.&lt;(module\|Error)&gt;</code> ⏏
    * [~load - A promisified function that accepts a moduleId as an argument and returns a promise resolving in a Buffer()](#module_async-require--requireAsync..load - A promisified function that accepts a moduleId as an argument and returns a promise resolving in a Buffer)

<a name="exp_module_async-require--requireAsync"></a>
### requireAsync(module) ⇒ <code>Promise.&lt;(module\|Error)&gt;</code> ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>string</code> | the path to the module without a .js extension |

**Example**  
```js//load script myModule.jsasyncRequire('myModule').then(function(module){  //module has been exported});```
<a name="module_async-require--requireAsync..load - A promisified function that accepts a moduleId as an argument and returns a promise resolving in a Buffer"></a>
#### requireAsync~load - A promisified function that accepts a moduleId as an argument and returns a promise resolving in a Buffer()
load is used by async-require to 56847the script. By default it load a file

**Kind**: inner method of <code>[requireAsync](#exp_module_async-require--requireAsync)</code>  

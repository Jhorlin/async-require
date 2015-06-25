# async-require

    <a name="module_async-require"></a>
## async-require
asyncronous module loader

**Example**  
```js//ironically loading async-require using syncronaous require.var asyncRequire = require('async-require');```
<a name="exp_module_async-require--requireAsync"></a>
### requireAsync(module) ⇒ <code>Promise.&lt;(module\|Error)&gt;</code> ⏏
**Kind**: Exported function  

| Param | Type | Description |
| --- | --- | --- |
| module | <code>string</code> | the path to the module without a .js extension |

**Example**  
```jsasyncRequire('myModule').then(function(module){  //module has been exported});```

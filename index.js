/**
 * Created by jhorlin.dearmas on 6/25/2015.
 */
/**
 * asyncronous module loader
 * @example
 * ```js
 * //ironically loading async-require using syncronaous require.
 * var asyncRequire = require('async-require');
 * ```
 *
 * @module async-require
 */

(function (module, global, require) {
    'use strict';
    var vm = require('vm'),
        fs = require('fs'),
        path = require('path'),
        extend = require('extend'),
        callsite = require('callsite'),
        Module = require('module'),
        stackDepth = 2,
        Promise = require('bluebird');

    /**
     * @example
     * ```js
     * //load script myModule.js
     * asyncRequire('myModule').then(function(module){
     *   //module has been exported
     * });
     * ```
     * @alias module:async-require
     * @param {string} module - the path to the module without a .js extension
     * @returns {Promise<module|Error>}
     */
    function requireAsync(module) {
        var moduleId = module + '.js';
        return moduleId in requireAsync.cache ? requireAsync.cache[moduleId] : requireAsync.cache[moduleId] =
            requireAsync
                .load(module)
                .then(function (data) {
                    var script = data.toString(),
                        sandboxModule = new Module(moduleId, module.parent),
                        sandbox = {
                            module: sandboxModule,
                            exports: sandboxModule.exports
                        };
                    vm.runInNewContext(script, extend({require:require}, global, sandbox));
                    return sandbox.module.exports;
                });
    }

    requireAsync.cache = {};

    /**
     * load is used by async-require to load the script. By default it load a file relative to the calling module
     * similar to how require works when loading module not installed through npm. Since this function is public you can
     * set a new load method.
     *@example
     * load a script with request
     * ```js
     * var asyncRequire = require('async-require'),
     *     request = require('request'),
     *     Promise = require('promise'),
     *     //load must return a promise
     *     get = Promise.promisify(request.get);
     *
     *     //overwrite the default load
     *     asyncRequire.load = function(url){
     *          //get the script
     *          return get(url).spread(function(res, body){
     *              //returrn only the body of the script
     *              return body;
     *          })
     *     }
     * ```
     *
     * @function load - A promisified function that accepts a moduleId as an argument and returns a promise resolving in an object with a toString method such as a Buffer or a String.
     * @public
     */
    requireAsync.load = (function (readFile) {
        return function (file) {
            var stack = callsite(),
                requesterFile = stack[stackDepth].getFileName(),
                requesterPath = path.dirname(requesterFile);
            return readFile(path.join(requesterPath, file) + '.js');
        };
    }(Promise.promisify(fs.readFile)));

    module.exports = requireAsync;
}(module, global, require));

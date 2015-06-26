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

(function (module, global) {
    'use strict';
    var vm = require('vm'),
        fs = require('fs'),
        path = require('path'),
        extend = require('extend'),
        Module = module.__proto__.constructor,
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
    function requireAsync (module) {
        var moduleId = module + '.js';
        return moduleId in requireAsync.cache ? requireAsync.cache[moduleId] : requireAsync.cache[moduleId] =
            requireAsync
                .load(module + '.js')
                .then(function (data) {
                    var script = data.toString(),
                        sandboxModule = new Module(moduleId, module.parent),
                        sandbox = {
                            module: sandboxModule,
                            exports: sandboxModule.exports
                        };
                    vm.runInNewContext(script, extend({}, global, sandbox));
                    return sandbox.module.exports;
                })
    }


    requireAsync.cache = {};

    /**
     * load is used by async-require to 56847the script. By default it load a file
     *
     *
     * @function load - A promisified function that accepts a moduleId as an argument and returns a promise resolving in a Buffer
     */
    requireAsync.load = (function (readFile) {
        return function (file) {
            return readFile(path.relative(__dirname, file));
        }
    }(Promise.promisify(fs.readFile)))


    module.exports = requireAsync;
}(module, global));

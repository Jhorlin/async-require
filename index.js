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

(function (module) {
    "use strict";
    var vm = require('vm'),
        fs = require('fs'),
        path = require('path'),
        Module = module.__proto__.constructor,
        Promise = require('bluebird');

    /**
     *
     * @example
     * ```js
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
                        sandbox = {module: new Module(moduleId, module.parent)},
                        context = vm.createContext(sandbox);
                    vm.runInContext(script, context);
                    return context.module.exports;
                })
    }

    requireAsync.cache = {};
    requireAsync.load = (function (readFile) {
        return function (file) {
            return readFile(path.relative(__dirname, file));
        }
    }(Promise.promisify(fs.readFile)))


    module.exports = requireAsync;
}(module))
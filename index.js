/**
 * Created by jhorlin.dearmas on 6/25/2015.
 */
(function (module) {
    "use strict";
    var vm = require('vm'),
        fs = require('fs'),
        Module = module.__proto__.constructor,
        Promise = require('bluebird');

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
    requireAsync.load = Promise.promisify(fs.readFile);
    module.exports = requireAsync;
}(module))
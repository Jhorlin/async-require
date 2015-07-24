/**
 * Created by jhorlin.dearmas on 6/25/2015.
 */
(function(){
    var requireAsync = require('../index'),
        expect = require('chai').expect;
    describe("test async-require", function(){

        describe('test that we can load modules asynchronously', function(){
            it("should load module 'loadme'", function(){
                return requireAsync('./scripts/loadme')
                    .then(function(module){
                        expect(module).to.eql({message:'hello world!'});
                    });
            })

            it("should not reference the module loaded through `require`", function () {
                return requireAsync('./scripts/loadme').then(function(module){
                    expect(require('./scripts/loadme')).to.not.equal(module)
                })

            })
        })

        describe('test that we load the global variables into the scope', function(){
            var globalVars = ['global', 'process', 'console', 'require', 'module', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'];
            globalVars.forEach(function(globalVar){
                it("should contain global variable " + globalVar, function(){
                    return requireAsync('./scripts/scope/' + globalVar + 'Test');
                })
            })
        })
    })
}())
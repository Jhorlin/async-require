/**
 * Created by jhorlin.dearmas on 6/25/2015.
 */
(function(){
    var requireAsync = require('../index'),
        expect = require('chai').expect;
    describe("test async loading", function(){
        //it("should load module 'loadme'", function(){
        //    return requireAsync('test/scripts/loadme')
        //        .then(function(module){
        //            expect(module).to.eql({message:'hello world!'});
        //        });
        //})

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
}())
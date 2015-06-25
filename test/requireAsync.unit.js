/**
 * Created by jhorlin.dearmas on 6/25/2015.
 */
(function(){
    var requireAsync = require('../index'),
        expect = require('chai').expect;
    describe("test async loading", function(){
        it("should load module 'loadme'", function(){
            return requireAsync('test/scripts/loadme')
                .then(function(module){
                    expect(module).to.equal('hello');
                });
        })
    })
}())
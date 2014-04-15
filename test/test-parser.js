var should = require('should');
var scan = require('../scanner')
var parse = require('../parser')
var error = require('../error')
var i = require('util').inspect

describe('The parser', function () {

  it('correctly checks syntax of variable declarations', function (done) {
    scan('test/data/workingPrograms/declareVars.min', function (tokens) {
      parse(tokens)
      error.count.should.equal(0)
      done()
    })
  })

  it('correctly checks syntax of print statements', function (done) {
    scan('test/data/workingPrograms/helloWorld.min', function (tokens) {
      parse(tokens)
      error.count.should.equal(0)
      done()
    })
  })

  it('correctly checks syntax of loop/block statements', function (done) {
    scan('test/data/workingPrograms/indentedBlocks.min', function (tokens) {
      parse(tokens)
      error.count.should.equal(0)
      done()
    })
  })

  it('correctly checks syntax for return statements', function (done) {
    scan('test/data/workingPrograms/return.min', function (tokens) {
      parse(tokens)
      error.count.should.equal(0)
      done()
    })
  })

  it('correctly handlings assignments and expressions', function (done) {
    scan('test/data/workingPrograms/someMath.min', function (tokens) {
      parse(tokens)
      error.count.should.equal(0)
      done()
    })
  })

});
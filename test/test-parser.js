var should = require('should');
var scan = require('../scanner')
var parse = require('../parser')
var error = require('../error')
var i = require('util').inspect

describe('The parser', function () {

  it('correctly checks syntax of variable declarations', function (done) {
    scan('test/data/workingPrograms/declareVars.min', function (tokens) {
      var previousErrorCount = error.count
      parse(tokens)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly checks syntax of print statements', function (done) {
    scan('test/data/workingPrograms/helloWorld.min', function (tokens) {
      var previousErrorCount = error.count
      parse(tokens)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly checks syntax of loop/block statements', function (done) {
    scan('test/data/workingPrograms/indentedBlocks.min', function (tokens) {
      var previousErrorCount = error.count
      parse(tokens)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly checks syntax for functions', function (done) {
    scan('test/data/workingPrograms/function.min', function (tokens) {
      var previousErrorCount = error.count
      parse(tokens)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly handlings assignments and expressions', function (done) {
    scan('test/data/workingPrograms/someMath.min', function (tokens) {
      var previousErrorCount = error.count
      parse(tokens)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

});
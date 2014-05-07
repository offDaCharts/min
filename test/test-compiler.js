var should = require('should');
var scan = require('../scanner')
var parse = require('../parser')
var generate = require('../generator')()
var error = require('../error')
var i = require('util').inspect

describe('The compiler', function () {

  it('compiles conditional.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/conditional.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles declareVars.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/declareVars.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles helloWorld.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/helloWorld.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles indentedBlocks.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/indentedBlocks.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles someMath.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/someMath.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles whileLoop.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/whileLoop.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles ifElse.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/ifElse.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles functionPathAnalysis.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/functionPathAnalysis.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

});
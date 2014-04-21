var should = require('should');
var scan = require('../scanner')
var parse = require('../parser')
var generate = require('../generator')()
var error = require('../error')
var i = require('util').inspect

describe('The compiler', function () {

  it('compiles conditional.min program without errors', function (done) {
    scan('test/data/workingPrograms/conditional.min', function (tokens) {
      program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(0)
      done()
    })
  })

  it('compiles declareVars.min program without errors', function (done) {
    scan('test/data/workingPrograms/declareVars.min', function (tokens) {
      program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(0)
      done()
    })
  })

  it('compiles helloWorld.min program without errors', function (done) {
    scan('test/data/workingPrograms/helloWorld.min', function (tokens) {
      program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(0)
      done()
    })
  })

  it('compiles indentedBlocks.min program without errors', function (done) {
    scan('test/data/workingPrograms/indentedBlocks.min', function (tokens) {
      program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(0)
      done()
    })
  })

  it('compiles someMath.min program without errors', function (done) {
    scan('test/data/workingPrograms/someMath.min', function (tokens) {
      program = parse(tokens)
      program.analyze()
      generate(program)
      error.count.should.equal(0)
      done()
    })
  })

});
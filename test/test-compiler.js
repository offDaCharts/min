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
      generate(program).should.equal(
        '(function () {\n' + 
        '    var _v1 = 3;\n' + 
        '    var _v2 = 4;\n' + 
        '    if ((_v1 > _v2)) {\n' + 
        '        alert(("hello world"));\n' + 
        '    }\n' + 
        '    else {\n' + 
        '        alert(("goodbye world"));\n' + 
        '    }\n' + 
        '}());\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles declareVars.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/declareVars.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program).should.equal(
        '(function () {\n' + 
        '    var _v1 = 34;\n' + 
        '    var _v2 = 2;\n' + 
        '    var _v3 = ("string");\n' + 
        '    var _v4 = 0;\n' + 
        '}());\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles helloWorld.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/helloWorld.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program).should.equal(
        '(function () {\n' + 
        '    alert(("Hello World"));\n' + 
        '}());\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles indentedBlocks.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/indentedBlocks.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program).should.equal(
        '(function () {\n' + 
        '    var _v1 = 2;\n' + 
        '    var _v2 = 4;\n' + 
        '    if ((_v1 > _v2)) {\n' + 
        '        alert(("hello world"));\n' + 
        '    }\n' + 
        '    else {\n' + 
        '        for (\n' + 
        '            var _v3 = 0;\n' + 
        '            (_v3 < 5);\n' + 
        '            _v3 += 1\n' + 
        '        ) {\n' + 
        '            alert(("hello 5 times"));\n' + 
        '        }\n' + 
        '    }\n' + 
        '}());\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles someMath.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/someMath.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program).should.equal(
        '(function () {\n' + 
        '    var _v1 = 34;\n' + 
        '    var _v2 = 2;\n' + 
        '    var _v3 = 0;\n' + 
        '    var _v4 = 2;\n' + 
        '    _v3 = (_v2 + (_v1 * 2))\n' + 
        '    _v4 = (_v3 * _v2)\n' + 
        '}());\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('compiles whileLoop.min program without errors', function (done) {
    var previousErrorCount = error.count
    scan('test/data/workingPrograms/whileLoop.min', function (tokens) {
      var program = parse(tokens)
      program.analyze()
      generate(program).should.equal(
        '(function () {\n' + 
        '    var _v1 = 2;\n' + 
        '    while ((_v1 < 5)) {\n' + 
        '        _v1 += 1\n' + 
        '    }\n' + 
        '}());\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

});
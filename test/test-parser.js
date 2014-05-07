var should = require('should');
var scan = require('../scanner')
var parse = require('../parser')
var error = require('../error')
var i = require('util').inspect

describe('The parser', function () {

  it('correctly checks syntax of variable declarations', function (done) {
    scan('test/data/workingPrograms/declareVars.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.toString().should.equal(
        "(Program (Block (Var :num number (= num 34)) (Var :n number (= n 2))" +
        " (Var :s string (= s (\"string\"))) (Var :a number)))"
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly checks syntax of print statements', function (done) {
    scan('test/data/workingPrograms/helloWorld.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.toString().should.equal(
        "(Program (Block (Write (\"Hello World\"))))"
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly checks syntax of loop/block statements', function (done) {
    scan('test/data/workingPrograms/indentedBlocks.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.toString().should.equal(
        "(Program (Block (Var :a number (= a 2)) (Var :b number (= b 4)) (If (> a b) (Block (Write (\"hello world\")))" +
        " else (Block (For (Var :i number (= i 0)) (< i 5) (Block (Write (\"hello 5 times\"))) and (+= i 1))))))"
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly checks syntax for functions', function (done) {
    scan('test/data/workingPrograms/function.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.toString().should.equal(
        "(Program (Block (Var :add function (= add ((Var :a number),(Var :b number))" +
        "(Block (Return (+ a b)))))) (Call: add (3,4))))"
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly handles assignments and expressions', function (done) {
    scan('test/data/workingPrograms/someMath.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.toString().should.equal(
        "(Program (Block (Var :num number (= num 34)) (Var :n number (= n 2)) (Var :a number (= a 0))" +
        " (Var :b number (= b 2)) (= a (+ n (* num 2))) (= b (* a n))))"
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly handles parsing a while loop', function (done) {
    scan('test/data/workingPrograms/whileLoop.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.toString().should.equal(
        "(Program (Block (Var :a number (= a 2)) (While (< a 5) (Block (+= a 1)))))"
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

});
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

  it('correctly handles parsing conditional statements', function (done) {
    scan('test/data/workingPrograms/conditional.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.toString().should.equal(
        "(Program (Block (Var :a number (= a 3)) (Var :b number (= b 4)) (If (> a b) " + 
        "(Block (Write (\"hello world\"))) else (Block (Write (\"goodbye world\"))))))"
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly handles parsing else if statements', function (done) {
    scan('test/data/workingPrograms/ifElse.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.toString().should.equal(
        "(Program (Block (Var :a number (= a 3)) (Var :b number (= b 2)) (If (> a b)" + 
        " (Block (Write (\"hello world\"))) else (Block (If (~ a b) (Block (Write (\"Goodbye world\")))" + 
        " else (Block (Write (\"the world\"))))))))"
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly handles parsing function with conditionals and finds no path errors', function (done) {
    scan('test/data/workingPrograms/functionPathAnalysis.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.toString().should.equal(
        '(Program (Block (Var :someFuction function (= someFuction ()(Block (If (> 2 3) (Block (Return ("am I"))) ' + 
        'else (Block (If (~ 2 3) (Block (Return ("returning"))) else (Block (Return ("something?"))))))))))))'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly catches path analysis error where function does not have a return in all paths', function (done) {
    scan('test/data/errors/badPathAnalysis.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      error.count.should.equal(previousErrorCount + 1)
      done()
    })
  })
});
var should = require('should');
var scan = require('../scanner')
var parse = require('../parser')
var error = require('../error')
var i = require('util').inspect

describe('The analyzer', function () {

    it('correctly analyzes variable declarations', function (done) {
    scan('test/data/workingPrograms/declareVars.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.analyze()
      program.getSemanticGraph().should.equal(
        '3 Type {"name":"number"}\n' + 
        '4 NumericLiteral {"token":"34","type":3}\n' + 
        '2 VariableDeclaration {"id":"num","type":3,"assignment":4}\n' + 
        '6 NumericLiteral {"token":"2","type":3}\n' + 
        '5 VariableDeclaration {"id":"n","type":3,"assignment":6}\n' + 
        '8 Type {"name":"string"}\n' + 
        '9 StringLiteral {"string":"\\"string\\"","type":8}\n' + 
        '7 VariableDeclaration {"id":"s","type":8,"assignment":9}\n' + 
        '10 VariableDeclaration {"id":"a","type":3}\n' + 
        '1 Block {"statements":[2,5,7,10]}\n' + 
        '0 Program {"block":1}\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly checks syntax of print statements', function (done) {
    scan('test/data/workingPrograms/helloWorld.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.analyze()
      program.getSemanticGraph().should.equal(
        '4 Type {"name":"string"}\n' + 
        '3 StringLiteral {"string":"\\"Hello World\\"","type":4}\n' + 
        '2 WriteStatement {"writeValue":3}\n' + 
        '1 Block {"statements":[2]}\n' + 
        '0 Program {"block":1}\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly checks syntax of loop/block statements', function (done) {
    scan('test/data/workingPrograms/indentedBlocks.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.analyze()
      program.getSemanticGraph().should.equal(
        '3 Type {"name":"number"}\n' + 
        '4 NumericLiteral {"token":"2","type":3}\n' + 
        '2 VariableDeclaration {"id":"a","type":3,"assignment":4}\n' + 
        '6 NumericLiteral {"token":"4","type":3}\n' + 
        '5 VariableDeclaration {"id":"b","type":3,"assignment":6}\n' + 
        '9 VariableReference {"token":"a","referent":2,"type":3}\n' + 
        '10 VariableReference {"token":"b","referent":5,"type":3}\n' + 
        '8 BinaryExpression {"op":">","left":9,"right":10,"type":3}\n' + 
        '14 Type {"name":"string"}\n' + 
        '13 StringLiteral {"string":"\\"hello world\\"","type":14}\n' + 
        '12 WriteStatement {"writeValue":13}\n' + 
        '11 Block {"statements":[12]}\n' + 
        '18 NumericLiteral {"token":"0","type":3}\n' + 
        '17 VariableDeclaration {"id":"i","type":3,"assignment":18}\n' + 
        '20 VariableReference {"token":"i","referent":17,"type":3}\n' + 
        '21 NumericLiteral {"token":"5","type":3}\n' + 
        '19 BinaryExpression {"op":"<","left":20,"right":21,"type":3}\n' + 
        '23 VariableReference {"token":"i","referent":17,"type":3}\n' + 
        '24 NumericLiteral {"token":"1","type":3}\n' + 
        '22 AssignmentStatement {"target":23,"assignment":"+=","source":24}\n' + 
        '27 StringLiteral {"string":"\\"hello 5 times\\"","type":14}\n' + 
        '26 WriteStatement {"writeValue":27}\n' + 
        '25 Block {"statements":[26]}\n' + 
        '16 ForStatement {"declaration":17,"condition":19,"assignment":22,"body":25}\n' + 
        '15 Block {"statements":[16]}\n' + 
        '7 ConditionalStatement {"condition":8,"body":11,"elseBody":15}\n' + 
        '1 Block {"statements":[2,5,7]}\n' + 
        '0 Program {"block":1}\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly checks syntax for functions', function (done) {
    scan('test/data/workingPrograms/function.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.analyze()
      program.getSemanticGraph().should.equal(
        '3 Type {"name":"function"}\n' + 
        '6 Type {"name":"number"}\n' + 
        '5 VariableDeclaration {"id":"a","type":6}\n' + 
        '7 VariableDeclaration {"id":"b","type":6}\n' + 
        '11 VariableReference {"token":"a","referent":5,"type":6}\n' + 
        '12 VariableReference {"token":"b","referent":7,"type":6}\n' + 
        '10 BinaryExpression {"op":"+","left":11,"right":12,"type":6}\n' + 
        '9 ReturnStatement {"returnValue":10}\n' + 
        '8 Block {"statements":[9]}\n' + 
        '4 MinFunction {"parameters":[5,7],"body":8}\n' + 
        '2 VariableDeclaration {"id":"add","type":3,"assignment":4}\n' + 
        '14 VariableReference {"token":"add","referent":2,"type":3}\n' + 
        '15 NumericLiteral {"token":"3"}\n' + 
        '16 NumericLiteral {"token":"4"}\n' + 
        '13 FunctionCall {"id":14,"parameters":[15,16]}\n' + 
        '1 Block {"statements":[2,13]}\n' + 
        '0 Program {"block":1}\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly handles assignments and expressions', function (done) {
    scan('test/data/workingPrograms/someMath.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.analyze()
      program.getSemanticGraph().should.equal(
        '3 Type {"name":"number"}\n' + 
        '4 NumericLiteral {"token":"34","type":3}\n' + 
        '2 VariableDeclaration {"id":"num","type":3,"assignment":4}\n' + 
        '6 NumericLiteral {"token":"2","type":3}\n' + 
        '5 VariableDeclaration {"id":"n","type":3,"assignment":6}\n' + 
        '8 NumericLiteral {"token":"0","type":3}\n' + 
        '7 VariableDeclaration {"id":"a","type":3,"assignment":8}\n' + 
        '10 NumericLiteral {"token":"2","type":3}\n' + 
        '9 VariableDeclaration {"id":"b","type":3,"assignment":10}\n' + 
        '12 VariableReference {"token":"a","referent":7,"type":3}\n' + 
        '14 VariableReference {"token":"n","referent":5,"type":3}\n' + 
        '16 VariableReference {"token":"num","referent":2,"type":3}\n' + 
        '17 NumericLiteral {"token":"2","type":3}\n' + 
        '15 BinaryExpression {"op":"*","left":16,"right":17,"type":3}\n' + 
        '13 BinaryExpression {"op":"+","left":14,"right":15,"type":3}\n' + 
        '11 AssignmentStatement {"target":12,"assignment":"=","source":13}\n' + 
        '19 VariableReference {"token":"b","referent":9,"type":3}\n' + 
        '21 VariableReference {"token":"a","referent":7,"type":3}\n' + 
        '22 VariableReference {"token":"n","referent":5,"type":3}\n' + 
        '20 BinaryExpression {"op":"*","left":21,"right":22,"type":3}\n' + 
        '18 AssignmentStatement {"target":19,"assignment":"=","source":20}\n' + 
        '1 Block {"statements":[2,5,7,9,11,18]}\n' + 
        '0 Program {"block":1}\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly handles parsing a while loop', function (done) {
    scan('test/data/workingPrograms/whileLoop.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.analyze()
      program.getSemanticGraph().should.equal(
        '3 Type {"name":"number"}\n' + 
        '4 NumericLiteral {"token":"2","type":3}\n' + 
        '2 VariableDeclaration {"id":"a","type":3,"assignment":4}\n' + 
        '7 VariableReference {"token":"a","referent":2,"type":3}\n' + 
        '8 NumericLiteral {"token":"5","type":3}\n' + 
        '6 BinaryExpression {"op":"<","left":7,"right":8,"type":3}\n' + 
        '11 VariableReference {"token":"a","referent":2,"type":3}\n' + 
        '12 NumericLiteral {"token":"1","type":3}\n' + 
        '10 AssignmentStatement {"target":11,"assignment":"+=","source":12}\n' + 
        '9 Block {"statements":[10]}\n' + 
        '5 WhileStatement {"condition":6,"body":9}\n' + 
        '1 Block {"statements":[2,5]}\n' + 
        '0 Program {"block":1}\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

  it('correctly handles parsing conditional statements', function (done) {
    scan('test/data/workingPrograms/conditional.min', function (tokens) {
      var previousErrorCount = error.count,
          program = parse(tokens)
      program.analyze()
      program.getSemanticGraph().should.equal(
        '3 Type {"name":"number"}\n' + 
        '4 NumericLiteral {"token":"3","type":3}\n' + 
        '2 VariableDeclaration {"id":"a","type":3,"assignment":4}\n' + 
        '6 NumericLiteral {"token":"4","type":3}\n' + 
        '5 VariableDeclaration {"id":"b","type":3,"assignment":6}\n' + 
        '9 VariableReference {"token":"a","referent":2,"type":3}\n' + 
        '10 VariableReference {"token":"b","referent":5,"type":3}\n' + 
        '8 BinaryExpression {"op":">","left":9,"right":10,"type":3}\n' + 
        '14 Type {"name":"string"}\n' + 
        '13 StringLiteral {"string":"\\"hello world\\"","type":14}\n' + 
        '12 WriteStatement {"writeValue":13}\n' + 
        '11 Block {"statements":[12]}\n' + 
        '17 StringLiteral {"string":"\\"goodbye world\\"","type":14}\n' + 
        '16 WriteStatement {"writeValue":17}\n' + 
        '15 Block {"statements":[16]}\n' + 
        '7 ConditionalStatement {"condition":8,"body":11,"elseBody":15}\n' + 
        '1 Block {"statements":[2,5,7]}\n' + 
        '0 Program {"block":1}\n'
      )
      error.count.should.equal(previousErrorCount)
      done()
    })
  })

});


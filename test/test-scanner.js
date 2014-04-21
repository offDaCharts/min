var should = require('should');
var scan = require('../scanner')
var error = require('../error')
var i = require('util').inspect

describe('The scanner', function () {

  it('correctly tokenizes hello world program', function (done) {
    scan('test/data/workingPrograms/helloWorld.min', function (tokens) {
      tokens.length.should.equal(4)
      var index = 0,
          lineNumber = 1
      i(tokens[index++]).should.equal(i({kind:'\'',lexeme:'\'',line: lineNumber,col:1}))
      i(tokens[index++]).should.equal(i({kind:'STRLIT',lexeme:'"Hello World"',line: lineNumber,col:2}))
      i(tokens[index++]).should.equal(i({ kind: 'NEWLINE', lexeme: 'NEWLINE', line: lineNumber++, col: 3 }))
      i(tokens[index++]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })

  it('correctly tokenizes numeric and string literals', function (done) {
    scan('test/data/symbols/literals.min', function (tokens) {
      tokens.length.should.equal(6)
      var index = 0,
          lineNumber = 1
      i(tokens[index++]).should.equal(i({ kind: 'NUMLIT', lexeme: '34.567', line: lineNumber, col: 1 }))
      i(tokens[index++]).should.equal(i({ kind: 'STRLIT', lexeme: '"This is a sentence."', line: lineNumber, col: 7 }))
      i(tokens[index++]).should.equal(i({ kind: 'NUMLIT', lexeme: '9240.4345', line: lineNumber, col: 28 }))
      i(tokens[index++]).should.equal(i({ kind: 'STRLIT', lexeme: '"wordswordswords"', line: lineNumber, col: 37 }))
      i(tokens[index++]).should.equal(i({ kind: 'NEWLINE', lexeme: 'NEWLINE', line: lineNumber++, col: 38 }))
      i(tokens[index++]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })

  it('declares variables and skips empty lines', function (done) {
    scan('test/data/workingPrograms/declareVars.min', function (tokens) {
      tokens.length.should.equal(16)
      var index = 0,
          lineNumber = 1
      i(tokens[index++]).should.equal(i({kind:'#',lexeme:'#',line: lineNumber,col:1}))
      i(tokens[index++]).should.equal(i({kind:'ID',lexeme:'num',line: lineNumber,col:2}))
      i(tokens[index++]).should.equal(i({kind:'=',lexeme:'=',line: lineNumber,col:5}))
      i(tokens[index++]).should.equal(i({kind:'NUMLIT',lexeme:'34',line: lineNumber,col:6}))
      i(tokens[index++]).should.equal(i({kind:'NEWLINE',lexeme:'NEWLINE', line: lineNumber++,col:7}))
      i(tokens[index++]).should.equal(i({kind:'#',lexeme:'#',line: lineNumber,col:1}))
      i(tokens[index++]).should.equal(i({kind:'ID',lexeme:'n',line: lineNumber,col:2}))
      i(tokens[index++]).should.equal(i({kind:'=',lexeme:'=',line: lineNumber,col:3}))
      i(tokens[index++]).should.equal(i({kind:'NUMLIT',lexeme:'2',line: lineNumber,col:4}))
      i(tokens[index++]).should.equal(i({kind:'NEWLINE',lexeme:'NEWLINE', line: lineNumber++,col:5}))
      lineNumber++
      i(tokens[index++]).should.equal(i({kind:'$',lexeme:'$',line: lineNumber,col:1}))
      i(tokens[index++]).should.equal(i({kind:'ID',lexeme:'s',line: lineNumber,col:2}))
      i(tokens[index++]).should.equal(i({kind:'=',lexeme:'=',line: lineNumber,col:3}))
      i(tokens[index++]).should.equal(i({kind:'STRLIT',lexeme:'"string"',line: lineNumber,col:4}))
      i(tokens[index++]).should.equal(i({kind:'NEWLINE',lexeme:'NEWLINE', line: lineNumber++,col:5}))
      i(tokens[index++]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })

  it('recognizes all two characters operators', function (done) {
    scan('test/data/symbols/twoCharOperators.min', function (tokens) {
      tokens.length.should.equal(9)
      var index = 0,
          lineNumber = 1
      i(tokens[index++]).should.equal(i({ kind: '<~', lexeme: '<~', line: lineNumber, col: 1 }))
      i(tokens[index++]).should.equal(i({ kind: '>~', lexeme: '>~', line: lineNumber, col: 3 }))
      i(tokens[index++]).should.equal(i({ kind: '\'~', lexeme: '\'~', line: lineNumber, col: 5 }))
      i(tokens[index++]).should.equal(i({ kind: '+=', lexeme: '+=', line: lineNumber, col: 7 }))
      i(tokens[index++]).should.equal(i({ kind: '-=', lexeme: '-=', line: lineNumber, col: 9 }))
      i(tokens[index++]).should.equal(i({ kind: '*=', lexeme: '*=', line: lineNumber, col: 11 }))
      i(tokens[index++]).should.equal(i({ kind: '/=', lexeme: '/=', line: lineNumber, col: 13 }))
      i(tokens[index++]).should.equal(i({ kind: 'NEWLINE', lexeme: 'NEWLINE', line: lineNumber++, col: 14 }))
      i(tokens[index++]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })

  it('recognizes all reserved characters', function (done) {
    scan('test/data/symbols/reservedCharacters.min', function (tokens) {
      tokens.length.should.equal(32)
      var index = 0,
          lineNumber = 1
      i(tokens[index++]).should.equal(i({ kind: '#', lexeme: '#', line: lineNumber, col: 1 }))
      i(tokens[index++]).should.equal(i({ kind: '$', lexeme: '$', line: lineNumber, col: 2 }))
      i(tokens[index++]).should.equal(i({ kind: '_', lexeme: '_', line: lineNumber, col: 3 }))
      i(tokens[index++]).should.equal(i({ kind: ';', lexeme: ';', line: lineNumber, col: 4 }))
      i(tokens[index++]).should.equal(i({ kind: '*', lexeme: '*', line: lineNumber, col: 5 }))
      i(tokens[index++]).should.equal(i({ kind: '^', lexeme: '^', line: lineNumber, col: 6 }))
      i(tokens[index++]).should.equal(i({ kind: '-', lexeme: '-', line: lineNumber, col: 7 }))
      i(tokens[index++]).should.equal(i({ kind: '+', lexeme: '+', line: lineNumber, col: 8 }))
      i(tokens[index++]).should.equal(i({ kind: '/', lexeme: '/', line: lineNumber, col: 9 }))
      i(tokens[index++]).should.equal(i({ kind: '!', lexeme: '!', line: lineNumber, col: 10 }))
      i(tokens[index++]).should.equal(i({ kind: '&', lexeme: '&', line: lineNumber, col: 11 }))
      i(tokens[index++]).should.equal(i({ kind: '|', lexeme: '|', line: lineNumber, col: 12 }))
      i(tokens[index++]).should.equal(i({ kind: ' ', lexeme: ' ', line: lineNumber, col: 13 }))
      i(tokens[index++]).should.equal(i({ kind: '<', lexeme: '<', line: lineNumber, col: 14 }))
      i(tokens[index++]).should.equal(i({ kind: '>', lexeme: '>', line: lineNumber, col: 15 }))
      i(tokens[index++]).should.equal(i({ kind: '?', lexeme: '?', line: lineNumber, col: 16 }))
      i(tokens[index++]).should.equal(i({ kind: ':', lexeme: ':', line: lineNumber, col: 17 }))
      i(tokens[index++]).should.equal(i({ kind: '%', lexeme: '%', line: lineNumber, col: 18 }))
      i(tokens[index++]).should.equal(i({ kind: '@', lexeme: '@', line: lineNumber, col: 19 }))
      i(tokens[index++]).should.equal(i({ kind: '=', lexeme: '=', line: lineNumber, col: 20 }))
      i(tokens[index++]).should.equal(i({ kind: '`', lexeme: '`', line: lineNumber, col: 21 }))
      i(tokens[index++]).should.equal(i({ kind: ',', lexeme: ',', line: lineNumber, col: 22 }))
      i(tokens[index++]).should.equal(i({ kind: '(', lexeme: '(', line: lineNumber, col: 23 }))
      i(tokens[index++]).should.equal(i({ kind: ')', lexeme: ')', line: lineNumber, col: 24 }))
      i(tokens[index++]).should.equal(i({ kind: '[', lexeme: '[', line: lineNumber, col: 25 }))
      i(tokens[index++]).should.equal(i({ kind: ']', lexeme: ']', line: lineNumber, col: 26 }))
      i(tokens[index++]).should.equal(i({ kind: '{', lexeme: '{', line: lineNumber, col: 27 }))
      i(tokens[index++]).should.equal(i({ kind: '}', lexeme: '}', line: lineNumber, col: 28 }))
      i(tokens[index++]).should.equal(i({ kind: '~', lexeme: '~', line: lineNumber, col: 29 }))
      i(tokens[index++]).should.equal(i({ kind: '\'', lexeme: '\'', line: lineNumber, col: 30 }))
      i(tokens[index++]).should.equal(i({ kind: 'BLOCK', lexeme: 'BLOCK', line: lineNumber++, col: 31 }))
      i(tokens[index++]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })
  
  it('recognizes indented blocks in conditionals and loops', function (done) {
    scan('test/data/workingPrograms/indentedBlocks.min', function (tokens) {
      tokens.length.should.equal(44)
      var index = 0,
          lineNumber = 1
      i(tokens[index++]).should.equal(i({kind:'#',lexeme:'#',line: lineNumber,col:1}))
      i(tokens[index++]).should.equal(i({kind:'ID',lexeme:'a',line: lineNumber,col:2}))
      i(tokens[index++]).should.equal(i({kind:'=',lexeme:'=',line: lineNumber,col:3}))
      i(tokens[index++]).should.equal(i({kind:'NUMLIT',lexeme:'2',line: lineNumber,col:4}))
      i(tokens[index++]).should.equal(i({kind:'NEWLINE',lexeme:'NEWLINE', line: lineNumber++,col:5}))
      i(tokens[index++]).should.equal(i({kind:'#',lexeme:'#',line: lineNumber,col:1}))
      i(tokens[index++]).should.equal(i({kind:'ID',lexeme:'b',line: lineNumber,col:2}))
      i(tokens[index++]).should.equal(i({kind:'=',lexeme:'=',line: lineNumber,col:3}))
      i(tokens[index++]).should.equal(i({kind:'NUMLIT',lexeme:'4',line: lineNumber,col:4}))
      i(tokens[index++]).should.equal(i({kind:'NEWLINE',lexeme:'NEWLINE', line: lineNumber++,col:5}))
      i(tokens[index++]).should.equal(i({ kind: '?', lexeme: '?', line: lineNumber, col: 1 }))
      i(tokens[index++]).should.equal(i({ kind: 'ID', lexeme: 'a', line: lineNumber, col: 2 }))
      i(tokens[index++]).should.equal(i({ kind: '>', lexeme: '>', line: lineNumber, col: 3 }))
      i(tokens[index++]).should.equal(i({ kind: 'ID', lexeme: 'b', line: lineNumber, col: 4 }))
      i(tokens[index++]).should.equal(i({ kind: 'BLOCK', lexeme: 'BLOCK', line: lineNumber++, col: 5 }))
      i(tokens[index++]).should.equal(i({ kind: 'INDENT', lexeme: 'INDENT', line: lineNumber, col: 1 }))
      i(tokens[index++]).should.equal(i({ kind: '\'', lexeme: '\'', line: lineNumber, col: 5 }))
      i(tokens[index++]).should.equal(i({ kind: 'STRLIT', lexeme: '"hello world"', line: lineNumber, col: 6 }))
      i(tokens[index++]).should.equal(i({ kind: 'NEWLINE', lexeme: 'NEWLINE', line: lineNumber++, col: 7 }))
      i(tokens[index++]).should.equal(i({ kind: 'DEDENT', lexeme: 'DEDENT', line: lineNumber, col: 1 }))
      i(tokens[index++]).should.equal(i({ kind: ':', lexeme: ':', line: lineNumber, col: 1 }))
      i(tokens[index++]).should.equal(i({ kind: 'BLOCK', lexeme: 'BLOCK', line: lineNumber++, col: 2 }))
      i(tokens[index++]).should.equal(i({ kind: 'INDENT', lexeme: 'INDENT', line: lineNumber, col: 1 }))
      i(tokens[index++]).should.equal(i({ kind: '%', lexeme: '%', line: lineNumber, col: 5 }))
      i(tokens[index++]).should.equal(i({ kind: '#', lexeme: '#', line: lineNumber, col: 6 }))
      i(tokens[index++]).should.equal(i({ kind: 'ID', lexeme: 'i', line: lineNumber, col: 7 }))
      i(tokens[index++]).should.equal(i({ kind: '=', lexeme: '=', line: lineNumber, col: 8 }))
      i(tokens[index++]).should.equal(i({ kind: 'NUMLIT', lexeme: '0', line: lineNumber, col: 9 }))
      i(tokens[index++]).should.equal(i({ kind: ',', lexeme: ',', line: lineNumber, col: 10 }))
      i(tokens[index++]).should.equal(i({ kind: 'ID', lexeme: 'i', line: lineNumber, col: 11 }))
      i(tokens[index++]).should.equal(i({ kind: '<', lexeme: '<', line: lineNumber, col: 12 }))
      i(tokens[index++]).should.equal(i({ kind: 'NUMLIT', lexeme: '5', line: lineNumber, col: 13 }))
      i(tokens[index++]).should.equal(i({ kind: ',', lexeme: ',', line: lineNumber, col: 14 }))
      i(tokens[index++]).should.equal(i({ kind: 'ID', lexeme: 'i', line: lineNumber, col: 15 }))
      i(tokens[index++]).should.equal(i({ kind: '+=', lexeme: '+=', line: lineNumber, col: 16 }))
      i(tokens[index++]).should.equal(i({ kind: 'NUMLIT', lexeme: '1', line: lineNumber, col: 18 }))
      i(tokens[index++]).should.equal(i({ kind: 'BLOCK', lexeme: 'BLOCK', line: lineNumber++, col: 19 }))
      i(tokens[index++]).should.equal(i({ kind: 'INDENT', lexeme: 'INDENT', line: lineNumber, col: 1 }))
      i(tokens[index++]).should.equal(i({ kind: '\'', lexeme: '\'', line: lineNumber, col: 9 }))
      i(tokens[index++]).should.equal(i({ kind: 'STRLIT', lexeme: '"hello 5 times"', line: lineNumber, col: 10 }))
      i(tokens[index++]).should.equal(i({ kind: 'NEWLINE', lexeme: 'NEWLINE', line: lineNumber++, col: 11 }))
      i(tokens[index++]).should.equal(i({ kind: 'DEDENT', lexeme: 'DEDENT' }))
      i(tokens[index++]).should.equal(i({ kind: 'DEDENT', lexeme: 'DEDENT' }))
      i(tokens[index++]).should.equal(i({ kind: 'EOF', lexeme: 'EOF' }))
      done()
    })
  })

  it('detects illegal characters', function (done) {
    scan('test/data/errors/test.min', function () {
      error.count.should.equal(3)
      done()
    })
  })
})

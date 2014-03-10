// var should = require('should');
// var scan = require('../scanner')
// var parse = require('../parser')
// var error = require('../error')
// var i = require('util').inspect

// describe('The parser', function () {

//   it('correctly parses the tokenized outputs', function (done) {
//     scan('test/data/workingPrograms/helloWorld.min', function (tokens) {
//       tokens.length.should.equal(3)
//       i(tokens[0]).should.equal(i({kind:'`',lexeme:'`',line:1,col:1}))
//       i(tokens[1]).should.equal(i({kind:'STRLIT',lexeme:'"Hello World"',line:1,col:2}))
//       i(tokens[2]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
//       done()
//     })
//   })

// });
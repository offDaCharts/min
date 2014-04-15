var should = require('should');
var scan = require('../scanner')
var parse = require('../parser')
var error = require('../error')
var i = require('util').inspect

describe('The analyzer', function () {

  it('correctly analyzes conditionals', function (done) {
    scan('test/data/workingPrograms/conditional.min', function (tokens) {
      parse(tokens).analyze()
      error.count.should.equal(0)
      done()
    })
  })
});


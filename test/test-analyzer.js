var should = require('should');
var scan = require('../scanner')
var parse = require('../parser')
var error = require('../error')
var i = require('util').inspect

describe('The analyzer', function () {

  it('correctly catches undefined variables and moves on', function (done) {
    scan('test/data/workingPrograms/indentedBlocks.min', function (tokens) {
      parse(tokens).analyze()
      error.count.should.equal(2)
      done()
    })
  })

});
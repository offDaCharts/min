var Type = require('./type')

function StringLiteral(string) {
  this.string = string
}

StringLiteral.prototype.toString = function () {
  return '(' + this.string + ')'
}

StringLiteral.prototype.analyze = function (context) {
  this.type = Type.STRING
}

module.exports = StringLiteral

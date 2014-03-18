var Type = require('./type')

function StringLiteral(op, left, right) {
  this.op  = op
  this.right = right
  this.left = left
}

StringLiteral.prototype.toString = function () {
  return '(' + this.op.lexeme + ' ' + this.left + ' ' + this.right + ')'
}

StringLiteral.prototype.analyze = function (context) {
  this.type = Type.STRING
}

module.exports = StringLiteral

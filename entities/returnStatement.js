function ReturnStatement(returnValue) {
  this.returnValue = returnValue
}

ReturnStatement.prototype.toString = function () {
  return '(Return ' + this.returnValue + ')'
}

ReturnStatement.prototype.analyze = function (context) {
  this.returnValue.analyze(context)
}

module.exports = ReturnStatement

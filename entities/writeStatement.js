function WriteStatement(writeValue) {
  this.writeValue = writeValue
}

WriteStatement.prototype.toString = function () {
  return '(Write ' + this.writeValue + ')'
}

WriteStatement.prototype.analyze = function (context) {
    this.writeValue.analyze(context)
}

module.exports = WriteStatement

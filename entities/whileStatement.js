function WhileStatement(condition, body) {
  this.condition = condition
  this.body = body
}

WhileStatement.prototype.toString = function () {
  return '(While ' + this.condition + ' ' + this.body + ')'
}

WhileStatement.prototype.analyze = function (context) {
  this.condition.analyze(context)
  var localContext = context.createChildContext()
  this.body.analyze(localContext)
}

module.exports = WhileStatement

function ConditionalStatement(condition, body, elseBody) {
  this.condition = condition
  this.body = body
  this.elseBody = elseBody
}

ConditionalStatement.prototype.toString = function () {
  return '(If ' + this.condition + ' ' + this.body + ' else ' + this.elseBody + ')'
}

ConditionalStatement.prototype.analyze = function (context) {
  this.condition.analyze(context)
  this.body.analyze(context)
}

module.exports = ConditionalStatement

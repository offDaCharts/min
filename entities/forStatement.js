function ForStatement(condition, assignment, body) {
  this.condition = condition
  this.assignment = assignment
  this.body = body
}

ForStatement.prototype.toString = function () {
  return '(For ' + this.condition + ' ' + this.body + ' and ' + this.assignment + ')'
}

ForStatement.prototype.analyze = function (context) {
  this.condition.analyze(context)
  this.body.analyze(context)
}

module.exports = ForStatement

function ForStatement(declaration, condition, assignment, body) {
  this.declaration = declaration
  this.condition = condition
  this.assignment = assignment
  this.body = body
}

ForStatement.prototype.toString = function () {
  return '(For ' + this.declaration + ' ' + 
    this.condition + ' ' + this.body + ' and ' + this.assignment + ')'
}

ForStatement.prototype.analyze = function (context) {
  var localContext = context.createChildContext()
  this.declaration.analyze(localContext)
  this.condition.analyze(localContext)
  this.assignment.analyze(localContext)
  this.body.analyze(localContext)
}

module.exports = ForStatement

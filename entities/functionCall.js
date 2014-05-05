function FunctionCall(id, parameters) {
  this.id = id
  this.parameters = parameters
}

FunctionCall.prototype.toString = function () {
  return '(Call: ' + id.token.lexeme + ' (' + this.parameters.join(',') + '))'
}

FunctionCall.prototype.analyze = function (context) {
  this.id.referent = context.lookupVariable(this.id.token)
  this.id.type = this.id.referent.type
}

module.exports = FunctionCall
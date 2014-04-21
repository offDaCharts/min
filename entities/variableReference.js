function VariableReference(token) {
  this.token = token
}

VariableReference.prototype.toString = function () {
  return this.token.lexeme
}

VariableReference.prototype.analyze = function (context) {
  console.log("here.................")
  console.log(this)
  this.referent = context.lookupVariable(this.token)
  this.type = this.referent.type
}

module.exports = VariableReference

function AssignmentStatement(target, assignment, source) {
  this.target = target
  this.assignment = assignment
  this.source = source
}

AssignmentStatement.prototype.toString = function () {
  return '(' + this.assignment + ' ' + this.target + ' ' + this.source + ')'
}

AssignmentStatement.prototype.analyze = function (context) {
  this.target.analyze(context)
  this.source.analyze(context)
  this.source.type.mustBeCompatibleWith(this.target.type, 'Type mismatch in assignment')
}

module.exports = AssignmentStatement

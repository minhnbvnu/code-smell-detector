function PrecedencePredicate(precedence) {
	SemanticContext.call(this);
	this.precedence = precedence === undefined ? 0 : precedence;
}
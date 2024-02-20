function RuleTransition(ruleStart, ruleIndex, precedence, followState) {
	Transition.call(this, ruleStart);
    this.ruleIndex = ruleIndex; // ptr to the rule definition object for this rule ref
    this.precedence = precedence;
    this.followState = followState; // what node to begin computations following ref to rule
    this.serializationType = Transition.RULE;
    this.isEpsilon = true;
    return this;
}
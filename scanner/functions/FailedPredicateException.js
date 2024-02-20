function FailedPredicateException(recognizer, predicate, message) {
	RecognitionException.call(this, {message:this.formatMessage(predicate,message || null), recognizer:recognizer,
                         input:recognizer.getInputStream(), ctx:recognizer._ctx});
    var s = recognizer._interp.atn.states[recognizer.state];
    var trans = s.transitions[0];
    if (trans instanceof PredicateTransition) {
        this.ruleIndex = trans.ruleIndex;
        this.predicateIndex = trans.predIndex;
    } else {
        this.ruleIndex = 0;
        this.predicateIndex = 0;
    }
    this.predicate = predicate;
    this.offendingToken = recognizer.getCurrentToken();
    return this;
}
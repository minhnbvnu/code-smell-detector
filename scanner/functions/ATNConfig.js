function ATNConfig(params, config) {
	this.checkContext(params, config);
	params = checkParams(params);
	config = checkParams(config, true);
    // The ATN state associated with this configuration///
    this.state = params.state!==null ? params.state : config.state;
    // What alt (or lexer rule) is predicted by this configuration///
    this.alt = params.alt!==null ? params.alt : config.alt;
    // The stack of invoking states leading to the rule/states associated
    //  with this config.  We track only those contexts pushed during
    //  execution of the ATN simulator.
    this.context = params.context!==null ? params.context : config.context;
    this.semanticContext = params.semanticContext!==null ? params.semanticContext :
        (config.semanticContext!==null ? config.semanticContext : SemanticContext.NONE);
    // We cannot execute predicates dependent upon local context unless
    // we know for sure we are in the correct context. Because there is
    // no way to do this efficiently, we simply cannot evaluate
    // dependent predicates unless we are in the rule that initially
    // invokes the ATN simulator.
    //
    // closure() tracks the depth of how far we dip into the
    // outer context: depth &gt; 0.  Note that it may not be totally
    // accurate depth since I don't ever decrement. TODO: make it a boolean then
    this.reachesIntoOuterContext = config.reachesIntoOuterContext;
    this.precedenceFilterSuppressed = config.precedenceFilterSuppressed;
    return this;
}
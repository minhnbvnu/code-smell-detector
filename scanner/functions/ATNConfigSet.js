function ATNConfigSet(fullCtx) {
	//
	// The reason that we need this is because we don't want the hash map to use
	// the standard hash code and equals. We need all configurations with the
	// same
	// {@code (s,i,_,semctx)} to be equal. Unfortunately, this key effectively
	// doubles
	// the number of objects associated with ATNConfigs. The other solution is
	// to
	// use a hash table that lets us specify the equals/hashcode operation.
	// All configs but hashed by (s, i, _, pi) not including context. Wiped out
	// when we go readonly as this set becomes a DFA state.
	this.configLookup = new Set(hashATNConfig, equalATNConfigs);
	// Indicates that this configuration set is part of a full context
	// LL prediction. It will be used to determine how to merge $. With SLL
	// it's a wildcard whereas it is not for LL context merge.
	this.fullCtx = fullCtx === undefined ? true : fullCtx;
	// Indicates that the set of configurations is read-only. Do not
	// allow any code to manipulate the set; DFA states will point at
	// the sets and they must not change. This does not protect the other
	// fields; in particular, conflictingAlts is set after
	// we've made this readonly.
	this.readonly = false;
	// Track the elements as they are added to the set; supports get(i)///
	this.configs = [];

	// TODO: these fields make me pretty uncomfortable but nice to pack up info
	// together, saves recomputation
	// TODO: can we track conflicts as they are added to save scanning configs
	// later?
	this.uniqueAlt = 0;
	this.conflictingAlts = null;

	// Used in parser and lexer. In lexer, it indicates we hit a pred
	// while computing a closure operation. Don't make a DFA state from this.
	this.hasSemanticContext = false;
	this.dipsIntoOuterContext = false;

	this.cachedHashString = "-1";

	return this;
}
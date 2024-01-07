constructor({ buffer, grammar, config, grammars, syncTimeoutMicros }) {
    TreeSitterLanguageMode._patchSyntaxNode();
    this.id = nextId++;
    this.buffer = buffer;
    this.grammar = grammar;
    this.config = config;
    this.grammarRegistry = grammars;
    this.rootLanguageLayer = new LanguageLayer(null, this, grammar, 0);
    this.injectionsMarkerLayer = buffer.addMarkerLayer();

    if (syncTimeoutMicros != null) {
      this.syncTimeoutMicros = syncTimeoutMicros;
    }

    this.rootScopeDescriptor = new ScopeDescriptor({
      scopes: [this.grammar.scopeName]
    });
    this.emitter = new Emitter();
    this.isFoldableCache = [];
    this.hasQueuedParse = false;

    this.grammarForLanguageString = this.grammarForLanguageString.bind(this);

    this.rootLanguageLayer
      .update(null)
      .then(() => this.emitter.emit('did-tokenize'));

    // TODO: Remove this once TreeSitterLanguageMode implements its own auto-indentation system. This
    // is temporarily needed in order to delegate to the TextMateLanguageMode's auto-indent system.
    this.regexesByPattern = {};
  }
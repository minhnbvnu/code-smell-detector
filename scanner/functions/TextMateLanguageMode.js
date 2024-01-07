constructor(params) {
    this.emitter = new Emitter();
    this.disposables = new CompositeDisposable();
    this.tokenIterator = new TokenIterator(this);
    this.regexesByPattern = {};

    this.alive = true;
    this.tokenizationStarted = false;
    this.id = params.id != null ? params.id : nextId++;
    this.buffer = params.buffer;
    this.largeFileMode = params.largeFileMode;
    this.config = params.config;
    this.largeFileMode =
      params.largeFileMode != null
        ? params.largeFileMode
        : this.buffer.buffer.getLength() >= 2 * 1024 * 1024;

    this.grammar = params.grammar || NullGrammar;
    this.rootScopeDescriptor = new ScopeDescriptor({
      scopes: [this.grammar.scopeName]
    });
    this.disposables.add(
      this.grammar.onDidUpdate(() => this.retokenizeLines())
    );
    this.retokenizeLines();
  }
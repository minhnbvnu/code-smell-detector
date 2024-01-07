constructor({ config } = {}) {
    this.config = config;
    this.subscriptions = new CompositeDisposable();
    this.textmateRegistry = new FirstMate.GrammarRegistry({
      maxTokensPerLine: 100,
      maxLineLength: 1000
    });
    this.clear();
  }
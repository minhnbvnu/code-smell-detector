function Call(snippet) {
    this.snippet = snippet;
    this.namespace = this.snippet.namespace;
    Call.__super__.constructor.apply(this, arguments);
  }
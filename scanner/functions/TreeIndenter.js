constructor(languageMode, scopes = undefined) {
    this.languageMode = languageMode;
    this.scopes =
      scopes ||
      languageMode.config.get('editor.scopes', {
        scope: this.languageMode.rootScopeDescriptor
      });
    log('[TreeIndenter] constructor', this.scopes);
  }
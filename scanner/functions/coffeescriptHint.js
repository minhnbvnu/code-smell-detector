function coffeescriptHint(editor, options) {
    return scriptHint(editor, coffeescriptKeywords, getCoffeeScriptToken, options);
  }
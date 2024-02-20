function evalScripts() {
    return this.extractScripts().map(function(script) { return eval(script) });
  }
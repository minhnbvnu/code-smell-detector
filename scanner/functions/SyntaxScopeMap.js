constructor(resultsBySelector) {
    this.namedScopeTable = {};
    this.anonymousScopeTable = {};
    for (let selector in resultsBySelector) {
      this.addSelector(selector, resultsBySelector[selector]);
    }
    setTableDefaults(this.namedScopeTable, true);
    setTableDefaults(this.anonymousScopeTable, false);
  }
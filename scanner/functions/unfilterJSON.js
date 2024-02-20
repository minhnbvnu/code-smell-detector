function unfilterJSON(filter) {
    return this.replace(filter || Prototype.JSONFilter, '$1');
  }
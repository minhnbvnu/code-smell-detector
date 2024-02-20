function Query(str, search, type) {
  this.str = str;
  this.type(type || 'and');
  this.search = search;
}
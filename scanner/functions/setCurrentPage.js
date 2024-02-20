function setCurrentPage(page) {
  if (page < 0) throw new Error('Page requested below 0.');

  this._change(this.state.setPage(page));
  return this;
}
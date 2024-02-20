function IncrementalSearch() {
    this.$options = {wrap: false, skipCurrent: false};
    this.$keyboardHandler = new ISearchKbd(this);
}
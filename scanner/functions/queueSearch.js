function queueSearch() {
    if (!key) {
      key = setTimeout(function () {
        key = undefined;

        doSearch(searchInput.value);
      }, 0);
    }
  }
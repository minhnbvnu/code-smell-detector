function getSearchState(cm) {
      var vim = cm.state.vim;
      return vim.searchState_ || (vim.searchState_ = new SearchState());
    }
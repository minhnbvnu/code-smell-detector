function asyncSync(q, sync, async) {
    setTimeout(function() { sync(mockSuggestions); }, 0);
  }
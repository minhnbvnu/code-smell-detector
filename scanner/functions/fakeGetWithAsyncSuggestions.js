function fakeGetWithAsyncSuggestions(query, sync, async) {
    sync(mockSuggestions);

    setTimeout(function() {
      async([
        { value: 'four', raw: { value: 'four' } },
        { value: 'five', raw: { value: 'five' } },
        { value: 'six', raw: { value: 'six' } },
        { value: 'seven', raw: { value: 'seven' } },
        { value: 'eight', raw: { value: 'eight' } },
      ]);
    }, 0);
  }
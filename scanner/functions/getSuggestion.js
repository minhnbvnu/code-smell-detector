function getSuggestion(query) {
    let firstLetter = query[0].toLocaleLowerCase();
    let results = downloaded.get(firstLetter);
    if (results) {
      results = fuzzysort.go(query, prepared, {limit: 10})
      return Promise.resolve(results.map(x => ({
        html: fuzzysort.highlight(x, '<b>', '</b>'),
        text: x.target
      })));
    } else {
      return downloadAndIndexFile(firstLetter).then(() => {
        return getSuggestion(query);
      })
    }
  }
function getResponse(query) {
    return jsonpFetch('https://suggestqueries.google.com/complete/search?client=firefox&q=' + encodeURIComponent(query));
  }
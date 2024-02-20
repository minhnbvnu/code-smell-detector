function fetchRecentSearches() {
  return fetchFromAPI({
    endpoint:   'searched_artists',
    params: {
      orderBy:  'createdAt',
      limit:    12
    }
  });
}
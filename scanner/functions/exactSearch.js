function exactSearch(query, term) {
  query = query.toLowerCase();
  term = term.toLowerCase();
  return term.indexOf(query) > -1;
}
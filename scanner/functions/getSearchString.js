function getSearchString() {
  return localStorage["search_string"] || 'https://www.google.com/search?q=%s';
}
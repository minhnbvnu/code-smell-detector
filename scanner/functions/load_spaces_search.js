function load_spaces_search(query, on_success, on_error) {
  load_resource("get", "/spaces?search="+query, null, on_success, on_error);
}
function load_filtered_spaces(filter, on_success, on_error) {
  load_resource("get", "/spaces?filter="+filter, null, on_success, on_error);
}
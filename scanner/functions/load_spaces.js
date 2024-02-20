function load_spaces(id, is_home, on_success, on_error) {
  if (!id || id=="undefined") {
    console.error("load_spaces id:", id);
    return;
  }

  var q = "?parent_space_id="+id;
  load_resource("get", "/spaces"+q, null, function(spaces) {
    on_success(spaces);
  }, on_error);
}
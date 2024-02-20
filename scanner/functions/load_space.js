function load_space(id, on_success, on_error) {
  if (!id || id=="undefined") {
    console.error("load_space id:", id);
    return;
  }
  var url = "/spaces/"+id;
  load_resource("get", url, null, function(space, req) {
    var role = req.getResponseHeader("x-spacedeck-space-role");
    on_success(space, role);
  }, on_error);
}
function render_space_as_html(space, artifacts) {
  if (!compiled_js.length) {
    walk(dom("#space")[0],0);
    //console.log("compiled template: \n"+compiled_js);
  }

  // --------
  var mouse_state = "idle";
  var active_tool = "pointer";
  var active_space = space;
  var active_space_artifacts = artifacts;

  var bounds_zoom = 1;
  var bounds_margin_horiz = 0;
  var bounds_margin_vert = 0;
  var viewport_zoom = 1;
  // --------

  var editing_artifact_id = null;
  var urls_to_links = function(html) {
    return html;
  }

  artifact_view_model.selected_artifacts_dict = {};

  for (var i=0; i<active_space_artifacts.length; i++) {
    var a = active_space_artifacts[i];
    artifact_view_model.update_board_artifact_viewmodel(a);
    if (!a.description) a.description = "";
    if (!a.title) a.title = "";
  }

  var h="";
  try {
    eval(compiled_js);
  } catch (e) {
    console.error("error rendering space "+space._id+" as html: "+e);
  }

  var style="html, body, #space { overflow: visible !important; }\n";
  style+=".wrapper { border: none !important; }\n";

  h='<html>\n<head>\n<link rel="stylesheet" href="/stylesheets/style.css"><style>'+style+'</style>\n</head>\n<body id="main">\n'+h+"\n</html>\n";

  return h;
}
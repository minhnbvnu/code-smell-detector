function handle_add_output(event, handle) {
  var output_area = handle.output_area;
  var output = handle.output;
  if ((output.data == undefined) || (!output.data.hasOwnProperty(EXEC_MIME_TYPE))) {
    return
  }
  var id = output.metadata[EXEC_MIME_TYPE]["id"];
  var toinsert = output_area.element.find("." + CLASS_NAME.split(' ')[0]);
  if (id !== undefined) {
    var nchildren = toinsert.length;
    var html_node = toinsert[nchildren-1].children[0];
    html_node.innerHTML = output.data[HTML_MIME_TYPE];
    var scripts = [];
    var nodelist = html_node.querySelectorAll("script");
    for (var i in nodelist) {
      if (nodelist.hasOwnProperty(i)) {
        scripts.push(nodelist[i])
      }
    }

    scripts.forEach( function (oldScript) {
      var newScript = document.createElement("script");
      var attrs = [];
      var nodemap = oldScript.attributes;
      for (var j in nodemap) {
        if (nodemap.hasOwnProperty(j)) {
          attrs.push(nodemap[j])
        }
      }
      attrs.forEach(function(attr) { newScript.setAttribute(attr.name, attr.value) });
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
    if (JS_MIME_TYPE in output.data) {
      toinsert[nchildren-1].children[1].textContent = output.data[JS_MIME_TYPE];
    }
    output_area._hv_plot_id = id;
    if ((window.Bokeh !== undefined) && (id in Bokeh.index)) {
      window.PyViz.plot_index[id] = Bokeh.index[id];
    } else {
      window.PyViz.plot_index[id] = null;
    }
  } else if (output.metadata[EXEC_MIME_TYPE]["server_id"] !== undefined) {
    var bk_div = document.createElement("div");
    bk_div.innerHTML = output.data[HTML_MIME_TYPE];
    var script_attrs = bk_div.children[0].attributes;
    for (var i = 0; i < script_attrs.length; i++) {
      toinsert[toinsert.length - 1].childNodes[1].setAttribute(script_attrs[i].name, script_attrs[i].value);
    }
    // store reference to server id on output_area
    output_area._bokeh_server_id = output.metadata[EXEC_MIME_TYPE]["server_id"];
  }
}
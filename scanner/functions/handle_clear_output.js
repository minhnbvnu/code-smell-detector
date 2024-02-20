function handle_clear_output(event, handle) {
  var id = handle.cell.output_area._hv_plot_id;
  var server_id = handle.cell.output_area._bokeh_server_id;
  if (((id === undefined) || !(id in PyViz.plot_index)) && (server_id !== undefined)) { return; }
  var comm = window.PyViz.comm_manager.get_client_comm("hv-extension-comm", "hv-extension-comm", function () {});
  if (server_id !== null) {
    comm.send({event_type: 'server_delete', 'id': server_id});
    return;
  } else if (comm !== null) {
    comm.send({event_type: 'delete', 'id': id});
  }
  delete PyViz.plot_index[id];
  if ((window.Bokeh !== undefined) & (id in window.Bokeh.index)) {
    var doc = window.Bokeh.index[id].model.document
    doc.clear();
    const i = window.Bokeh.documents.indexOf(doc);
    if (i > -1) {
      window.Bokeh.documents.splice(i, 1);
    }
  }
}
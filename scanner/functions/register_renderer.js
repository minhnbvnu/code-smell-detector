function register_renderer(events, OutputArea) {
  function append_mime(data, metadata, element) {
    // create a DOM node to render to
    var toinsert = this.create_output_subarea(
    metadata,
    CLASS_NAME,
    EXEC_MIME_TYPE
    );
    this.keyboard_manager.register_events(toinsert);
    // Render to node
    var props = {data: data, metadata: metadata[EXEC_MIME_TYPE]};
    render(props, toinsert[0]);
    element.append(toinsert);
    return toinsert
  }

  events.on('output_added.OutputArea', handle_add_output);
  events.on('output_updated.OutputArea', handle_update_output);
  events.on('clear_output.CodeCell', handle_clear_output);
  events.on('delete.Cell', handle_clear_output);
  events.on('kernel_ready.Kernel', handle_kernel_cleanup);

  OutputArea.prototype.register_mime_type(EXEC_MIME_TYPE, append_mime, {
    safe: true,
    index: 0
  });
}
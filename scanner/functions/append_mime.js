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
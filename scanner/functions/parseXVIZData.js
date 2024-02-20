function parseXVIZData(data, opts = {}) {
  // TODO(twojtasz): this data.message is due an
  // uncoordinated change on the XVIZ server, temporary.
  const typeKey = opts.v2Type || data.type || data.message || data.update_type;

  switch (typeKey) {
    case 'state_update':
      return parseTimesliceData(data, opts.convertPrimitive);
    case 'metadata':
      return {
        ...parseLogMetadata(data),
        // ensure application sees the metadata type set to the uppercase version
        type: XVIZ_MESSAGE_TYPE.METADATA
      };
    case 'transform_log_done':
      return {...data, type: XVIZ_MESSAGE_TYPE.DONE};
    case 'error':
      return {...data, message: 'Stream server error', type: XVIZ_MESSAGE_TYPE.ERROR};

    // v1 types
    case 'done':
      return {...data, type: XVIZ_MESSAGE_TYPE.DONE};
    default:
      //  TODO(twojtasz): XVIZ should be tagging this with a type
      return parseTimesliceData(data, opts.convertPrimitive);
  }
}
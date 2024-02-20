function determineWriter(sink, format, options) {
  let writer = null;
  switch (format) {
    case XVIZ_FORMAT.BINARY_GLB:
      writer = new XVIZBinaryWriter(sink, options);
      break;
    case XVIZ_FORMAT.BINARY_PBE:
      writer = new XVIZProtobufWriter(sink, options);
      break;
    case XVIZ_FORMAT.JSON_BUFFER:
      writer = new XVIZJSONBufferWriter(sink, options);
      break;
    case XVIZ_FORMAT.JSON_STRING:
      writer = new XVIZJSONWriter(sink, options);
      break;
    default:
      throw new Error(`Cannot convert XVIZData to format ${format}`);
  }

  return writer;
}
function renderXVIZ(context, messages) {
  const metadata = parseMessage(messages[0]);
  const timeslice = parseMessage(messages[1]);
  const styleParser = new XVIZStyleParser(metadata.styles);
  const {width, height} = context.canvas;

  for (const streamName in metadata.streams) {
    const streamMetadata = metadata.streams[streamName];
    const stream = timeslice.streams[streamName];
    if (!stream) {
      continue; // eslint-disable-line
    }

    const renderer = renderers[streamMetadata.primitive_type];
    const project = getTransform({
      vehiclePose: timeslice.vehiclePose,
      streamMetadata,
      viewport: {width, height}
    });
    const stylesheet = styleParser.getStylesheet(streamName);

    if (renderer) {
      if (stream.features) {
        stream.features.forEach(feature => renderer({context, feature, stylesheet, project}));
      }
    }
  }
}
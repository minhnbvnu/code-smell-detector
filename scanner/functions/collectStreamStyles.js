function collectStreamStyles(metadataStreams) {
  const internalStylesheet = {};
  Object.keys(metadataStreams).forEach(streamId => {
    const streamMetadata = metadataStreams[streamId];
    const streamStylesheet = [];
    if (streamMetadata.stream_style) {
      streamStylesheet.push({
        name: '*',
        style: streamMetadata.stream_style
      });
    }

    if (streamMetadata.style_classes) {
      streamStylesheet.push(...streamMetadata.style_classes);
    }

    if (streamStylesheet.length !== 0) {
      internalStylesheet[streamId] = streamStylesheet;
    }
  });

  return internalStylesheet;
}
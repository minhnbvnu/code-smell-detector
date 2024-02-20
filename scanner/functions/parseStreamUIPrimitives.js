function parseStreamUIPrimitives(components, streamName, time) {
  const result = Object.assign({time}, components);

  if (getXVIZConfig().DYNAMIC_STREAM_METADATA) {
    result.__metadata = {
      category: 'UI_PRIMITIVE'
    };
  }

  return result;
}
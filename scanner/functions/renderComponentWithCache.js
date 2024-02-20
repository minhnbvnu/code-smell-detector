function renderComponentWithCache (node, isRoot, key, context) {
  var write = context.write;
  write.caching = true;
  var buffer = write.cacheBuffer;
  var bufferIndex = buffer.push('') - 1;
  var componentBuffer = write.componentBuffer;
  componentBuffer.push(new Set());
  context.renderStates.push({
    type: 'ComponentWithCache',
    key: key,
    buffer: buffer,
    bufferIndex: bufferIndex,
    componentBuffer: componentBuffer
  });
  renderComponentInner(node, isRoot, context);
}
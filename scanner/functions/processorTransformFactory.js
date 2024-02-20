function processorTransformFactory({
  serviceName,
  functionName,
  errorStream
}) {
  const transform = new ChunkSplitTransform({
    separator: '\n'
  });

  transform.pipe(new FcErrorTransform({
    serviceName: serviceName,
    functionName: functionName
  })).pipe(errorStream);

  return transform;
}
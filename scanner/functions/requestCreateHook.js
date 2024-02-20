function requestCreateHook(shim, { request }) {
  const { config } = shim.agent
  const parentSegment = getParentSegment(shim)
  request[symbols.parentSegment] = parentSegment
  if (!parentSegment || (parentSegment && parentSegment.opaque)) {
    logger.trace(
      'Not capturing data for outbound request (%s) because parent segment opaque (%s)',
      request.path,
      parentSegment && parentSegment.name
    )

    return
  }

  try {
    addDTHeaders({ transaction: parentSegment.transaction, config, request })
    createExternalSegment({ shim, request, parentSegment })
  } catch (err) {
    logger.warn(err, 'Unable to create external segment')
  }
}
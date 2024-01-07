function createCenterConstraint(options) {
  if (options.extent !== undefined) {
    const smooth =
      options.smoothExtentConstraint !== undefined
        ? options.smoothExtentConstraint
        : true;
    return createExtent(options.extent, options.constrainOnlyCenter, smooth);
  }

  const projection = createProjection(options.projection, 'EPSG:3857');
  if (options.multiWorld !== true && projection.isGlobal()) {
    const extent = projection.getExtent().slice();
    extent[0] = -Infinity;
    extent[2] = Infinity;
    return createExtent(extent, false, false);
  }

  return centerNone;
}
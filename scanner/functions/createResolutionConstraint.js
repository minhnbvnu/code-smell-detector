function createResolutionConstraint(options) {
  let resolutionConstraint;
  let maxResolution;
  let minResolution;

  // TODO: move these to be ol constants
  // see https://github.com/openlayers/openlayers/issues/2076
  const defaultMaxZoom = 28;
  const defaultZoomFactor = 2;

  let minZoom =
    options.minZoom !== undefined ? options.minZoom : DEFAULT_MIN_ZOOM;

  let maxZoom =
    options.maxZoom !== undefined ? options.maxZoom : defaultMaxZoom;

  const zoomFactor =
    options.zoomFactor !== undefined ? options.zoomFactor : defaultZoomFactor;

  const multiWorld =
    options.multiWorld !== undefined ? options.multiWorld : false;

  const smooth =
    options.smoothResolutionConstraint !== undefined
      ? options.smoothResolutionConstraint
      : true;

  const showFullExtent =
    options.showFullExtent !== undefined ? options.showFullExtent : false;

  const projection = createProjection(options.projection, 'EPSG:3857');
  const projExtent = projection.getExtent();
  let constrainOnlyCenter = options.constrainOnlyCenter;
  let extent = options.extent;
  if (!multiWorld && !extent && projection.isGlobal()) {
    constrainOnlyCenter = false;
    extent = projExtent;
  }

  if (options.resolutions !== undefined) {
    const resolutions = options.resolutions;
    maxResolution = resolutions[minZoom];
    minResolution =
      resolutions[maxZoom] !== undefined
        ? resolutions[maxZoom]
        : resolutions[resolutions.length - 1];

    if (options.constrainResolution) {
      resolutionConstraint = createSnapToResolutions(
        resolutions,
        smooth,
        !constrainOnlyCenter && extent,
        showFullExtent,
      );
    } else {
      resolutionConstraint = createMinMaxResolution(
        maxResolution,
        minResolution,
        smooth,
        !constrainOnlyCenter && extent,
        showFullExtent,
      );
    }
  } else {
    // calculate the default min and max resolution
    const size = !projExtent
      ? // use an extent that can fit the whole world if need be
        (360 * METERS_PER_UNIT.degrees) / projection.getMetersPerUnit()
      : Math.max(getWidth(projExtent), getHeight(projExtent));

    const defaultMaxResolution =
      size / DEFAULT_TILE_SIZE / Math.pow(defaultZoomFactor, DEFAULT_MIN_ZOOM);

    const defaultMinResolution =
      defaultMaxResolution /
      Math.pow(defaultZoomFactor, defaultMaxZoom - DEFAULT_MIN_ZOOM);

    // user provided maxResolution takes precedence
    maxResolution = options.maxResolution;
    if (maxResolution !== undefined) {
      minZoom = 0;
    } else {
      maxResolution = defaultMaxResolution / Math.pow(zoomFactor, minZoom);
    }

    // user provided minResolution takes precedence
    minResolution = options.minResolution;
    if (minResolution === undefined) {
      if (options.maxZoom !== undefined) {
        if (options.maxResolution !== undefined) {
          minResolution = maxResolution / Math.pow(zoomFactor, maxZoom);
        } else {
          minResolution = defaultMaxResolution / Math.pow(zoomFactor, maxZoom);
        }
      } else {
        minResolution = defaultMinResolution;
      }
    }

    // given discrete zoom levels, minResolution may be different than provided
    maxZoom =
      minZoom +
      Math.floor(
        Math.log(maxResolution / minResolution) / Math.log(zoomFactor),
      );
    minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);

    if (options.constrainResolution) {
      resolutionConstraint = createSnapToPower(
        zoomFactor,
        maxResolution,
        minResolution,
        smooth,
        !constrainOnlyCenter && extent,
        showFullExtent,
      );
    } else {
      resolutionConstraint = createMinMaxResolution(
        maxResolution,
        minResolution,
        smooth,
        !constrainOnlyCenter && extent,
        showFullExtent,
      );
    }
  }
  return {
    constraint: resolutionConstraint,
    maxResolution: maxResolution,
    minResolution: minResolution,
    minZoom: minZoom,
    zoomFactor: zoomFactor,
  };
}
function renderFeature(
  replayGroup,
  feature,
  style,
  squaredTolerance,
  listener,
  transform,
  declutterBuilderGroup,
) {
  const loadingPromises = [];
  const imageStyle = style.getImage();
  if (imageStyle) {
    let loading = true;
    const imageState = imageStyle.getImageState();
    if (imageState == ImageState.LOADED || imageState == ImageState.ERROR) {
      loading = false;
    } else {
      if (imageState == ImageState.IDLE) {
        imageStyle.load();
      }
    }
    if (loading) {
      loadingPromises.push(imageStyle.ready());
    }
  }
  const fillStyle = style.getFill();
  if (fillStyle && fillStyle.loading()) {
    loadingPromises.push(fillStyle.ready());
  }
  const loading = loadingPromises.length > 0;
  if (loading) {
    Promise.all(loadingPromises).then(() => listener(null));
  }
  renderFeatureInternal(
    replayGroup,
    feature,
    style,
    squaredTolerance,
    transform,
    declutterBuilderGroup,
  );

  return loading;
}
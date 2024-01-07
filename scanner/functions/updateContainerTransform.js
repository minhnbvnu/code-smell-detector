function updateContainerTransform() {
  if (workerFrameState) {
    const viewState = mainThreadFrameState.viewState;
    const renderedViewState = workerFrameState.viewState;
    const center = viewState.center;
    const resolution = viewState.resolution;
    const rotation = viewState.rotation;
    const renderedCenter = renderedViewState.center;
    const renderedResolution = renderedViewState.resolution;
    const renderedRotation = renderedViewState.rotation;
    const transform = create();
    // Skip the extra transform for rotated views, because it will not work
    // correctly in that case
    if (!rotation) {
      compose(
        transform,
        (renderedCenter[0] - center[0]) / resolution,
        (center[1] - renderedCenter[1]) / resolution,
        renderedResolution / resolution,
        renderedResolution / resolution,
        rotation - renderedRotation,
        0,
        0,
      );
    }
    transformContainer.style.transform = toTransformString(transform);
  }
}
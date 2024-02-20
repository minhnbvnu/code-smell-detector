function processScreenshot(event, timestamp, profilerData, state) {
  const encodedSnapshot = event.args.snapshot; // Base 64 encoded

  const snapshot = {
    height: 0,
    image: null,
    imageSource: `data:image/png;base64,${encodedSnapshot}`,
    timestamp,
    width: 0
  }; // Delay processing until we've extracted snapshot dimensions.

  let resolveFn = null;
  state.asyncProcessingPromises.push(new Promise(resolve => {
    resolveFn = resolve;
  })); // Parse the Base64 image data to determine native size.
  // This will be used later to scale for display within the thumbnail strip.

  fetch(snapshot.imageSource).then(response => response.blob()).then(blob => {
    // $FlowFixMe createImageBitmap
    createImageBitmap(blob).then(bitmap => {
      snapshot.height = bitmap.height;
      snapshot.width = bitmap.width;
      resolveFn();
    });
  });
  profilerData.snapshots.push(snapshot);
}
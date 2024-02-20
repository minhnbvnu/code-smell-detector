function convertImagesToBase64(protoObject) {
  if (protoObject.primitives) {
    const prims = protoObject.primitives;
    for (const stream of Object.keys(prims)) {
      if (prims[stream].images) {
        prims[stream].images.forEach(entry => {
          convertImageToBase64(entry);
        });
      }
    }
  } else if (protoObject.images) {
    protoObject.images.forEach(entry => {
      convertImageToBase64(entry);
    });
  } else if (protoObject.data && protoObject.width_px) {
    convertImageToBase64(protoObject);
  }
}
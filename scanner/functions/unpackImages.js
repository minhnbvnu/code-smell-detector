function unpackImages(arrayBuffer, bufferViews, json) {
  // unpack images
  const images = json.images || [];

  const imageBuffers = [];

  for (let i = 0; i < images.length; ++i) {
    const image = images[i];
    assert(image);

    const bufferView = bufferViews[image.bufferView];
    assert(bufferView);

    // Create a new typed array as a view into the combined buffer
    const array = new Uint8Array(arrayBuffer, bufferView.byteOffset, bufferView.byteLength);
    // Store the metadata on the array (e.g. needed to determine number of components per element)
    array.imate = image;
    imageBuffers.push(array);
  }

  return imageBuffers;
}
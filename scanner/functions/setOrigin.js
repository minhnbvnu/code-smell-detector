function setOrigin(context, setOfRootObject) {
  const Y = [];
  const X = [];
  let size = 0;

  setOfRootObject.forEach(layer => {
    layer = layer.sketchObject
    const layerSize = layer.frame().height();
    const origin = layer.origin()
    Y.push(origin.y - size);
    X.push(origin.x - size);
    if (layerSize > size) size = layerSize;
  });


  const yOrigin = (Y.length !== 0) ? Math.max(...Y) : 0
  const xOrigin = (X.length !== 0) ? Math.max(...X) + size : 0

  return {
    yOrigin: (setOfRootObject.length === 0) ? yOrigin : yOrigin + 100 + size,
    xOrigin: (setOfRootObject.length === 0) ? xOrigin : xOrigin + 100 + size
  }
}
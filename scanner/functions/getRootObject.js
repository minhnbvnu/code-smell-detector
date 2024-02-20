function getRootObject(context) {
  const result = [];
  Document.getSelectedDocument().selectedPage.layers.forEach((layer) => {
    let className = String(layer.sketchObject.class())
    if (className === 'MSArtboardGroup' || className === 'MSSymbolMaster') {
      result.push(layer)
    }
  })

  return result;
}
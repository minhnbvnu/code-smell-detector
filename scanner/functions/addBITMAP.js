function addBITMAP(context, rootObject, params, icon) {

  if (String(icon.class()) === 'MSBitmapLayer') {
    MSLayerGroup.moveLayers_intoGroup([icon], rootObject)
  } else {

    const img = new Image({ image: icon });
    rootObject.addLayer(img.sketchObject);
  }
  resizeIcon(rootObject, params.iconPadding);
  center(params.artboardSize, rootObject.firstLayer());
  rootObject.firstLayer().setName(rootObject.name());
}
function resizeIcon(rootObject, iconPadding) {

  const svgLayer = rootObject.firstLayer()
  const svgLayerFrame = svgLayer.frame();

  const currentArtboardRect = rootObject.rect();
  const currentArtboardSize = {
    width: parseInt(currentArtboardRect.size.width),
    height: parseInt(currentArtboardRect.size.height)
  };

  const width = svgLayerFrame.width();
  const height = svgLayerFrame.height();

  svgLayerFrame.constrainProportions = true;

  if (width >= height) {
    svgLayerFrame.setWidth((currentArtboardSize.width - 2 * iconPadding) + 0.0000001);
  } else {
    svgLayerFrame.setHeight((currentArtboardSize.height - 2 * iconPadding) + 0.0000001);
  }
}
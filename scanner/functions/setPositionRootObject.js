function setPositionRootObject(rootObject, mensuration) {

  const rootObjectFrame = rootObject.frame();
  rootObjectFrame.setWidth(mensuration.width);
  rootObjectFrame.setHeight(mensuration.height);
  rootObjectFrame.setX(mensuration.x);
  rootObjectFrame.setY(mensuration.y);
}
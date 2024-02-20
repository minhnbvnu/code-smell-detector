function resizeRootObject(rootObject, size) {
  const rootObjectFrame = rootObject.frame()
  rootObjectFrame.setWidth(size);
  rootObjectFrame.setHeight(size);
}
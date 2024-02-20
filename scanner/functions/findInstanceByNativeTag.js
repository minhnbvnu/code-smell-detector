function findInstanceByNativeTag(rootTag, nativeTag) {
  return ReactNativeComponentTree.getInstanceFromNode(nativeTag);
}
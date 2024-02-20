function findTaggedLayers(tag) {
  function test(lyr) {
    return tag && parseObjectName(lyr.name)[tag];
  }
  return findLayers(doc.layers, test) || [];
}
function unlockContainer(o) {
  var type = o.typename;
  var i, item, pathCount;
  if (o.hidden === true || o.visible === false) return;
  if (o.locked) {
    unlockObject(o);
  }

  // unlock locked clipping paths (so contents can be selected later)
  // optimization: Layers containing hundreds or thousands of paths are unlikely
  //    to contain a clipping mask and are slow to scan -- skip these
  pathCount = o.pathItems.length;
  if ((type == 'Layer' && pathCount < 500) || (type == 'GroupItem' && o.clipped)) {
    for (i=0; i<pathCount; i++) {
      item = o.pathItems[i];
      if (!item.hidden && item.clipping && item.locked) {
        unlockObject(item);
        break;
      }
    }
  }

  // recursively unlock sub-layers and groups
  forEach(o.groupItems, unlockContainer);
  if (o.typename == 'Layer') {
    forEach(o.layers, unlockContainer);
  }
}
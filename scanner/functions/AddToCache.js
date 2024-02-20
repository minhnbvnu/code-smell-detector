function AddToCache(hash, shape) {
  let cacheShape  = new oc.TopoDS_Shape(shape);
  cacheShape.hash = hash; // This is the cached version of the object
  argCache[hash]  = cacheShape;
  return hash;
}
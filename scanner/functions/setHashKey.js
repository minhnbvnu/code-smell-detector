function setHashKey(obj, h) {
  if (h) {
    obj.$$hashKey = h;
  } else {
    delete obj.$$hashKey;
  }
}
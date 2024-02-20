function depthSort(obj1, obj2, prop = 'y') {
  [obj1, obj2] = [obj1, obj2].map(getWorldRect);
  return obj1[prop] - obj2[prop];
}
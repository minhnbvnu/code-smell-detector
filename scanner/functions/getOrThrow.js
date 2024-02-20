function getOrThrow(map, k) {
  if (!map.has(k)) {
    throw new Error(`Expected key ${k}`);
  }

  return map.get(k);
}
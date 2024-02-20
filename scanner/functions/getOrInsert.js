function getOrInsert(map, k, fallback) {
  if (!map.has(k)) map.set(k, fallback(k));
  return map.get(k);
}
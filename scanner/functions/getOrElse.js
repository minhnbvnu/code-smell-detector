function getOrElse(map, k, fallback) {
  if (!map.has(k)) return fallback(k);
  return map.get(k);
}
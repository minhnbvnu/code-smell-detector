function setIntersection(set1, set2) {
  if(!set1 || !set2) return []
  return [...set1].filter(x => set2.has(x))
}
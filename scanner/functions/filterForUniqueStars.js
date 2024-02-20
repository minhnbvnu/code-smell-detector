function filterForUniqueStars(data, stars) {
  const dataSet = new Set(data.map(item => item.full_name));
  return [...stars.filter(item => !dataSet.has(item.full_name))];
}
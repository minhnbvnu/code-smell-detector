function objectFromMap(map) {
  const obj = Object.create(null);

  for (const [key, value] of map) {
    obj[key] = value;
  }

  return obj;
}
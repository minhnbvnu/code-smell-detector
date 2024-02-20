async function asArrowTable(array, name) {
  const arrow = await loadArrow();
  return arrayIsPrimitive(array)
    ? arrow.tableFromArrays({[name]: array})
    : arrow.tableFromJSON(array);
}
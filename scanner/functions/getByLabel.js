function getByLabel(array, label) {
  const item = array.find(item => item.label === label);
  if (!item) throw new Error(`Item with label ${label} not found`);
  return item;
}
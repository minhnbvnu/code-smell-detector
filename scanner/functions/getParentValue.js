function getParentValue(children, values) {
  let parentValue = null;
  for (const key in children) {
    const value = values[key];
    if (parentValue === null) {
      parentValue = value;
    } else if (parentValue !== value) {
      return CheckBox.INDETERMINATE;
    }
  }
  return parentValue;
}
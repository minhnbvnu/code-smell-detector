function updateValue(el, force = false) {
  const { value } = el;
  const { previousValue, mask } = options.get(el);

  const isValueChanged = value !== previousValue;
  const isLengthIncreased = value.length > previousValue.length;
  const isUpdateNeeded = value && isValueChanged && isLengthIncreased;

  if ((force || isUpdateNeeded) && mask) {
    const { conformedValue } = conformToMask(value, mask, { guide: false });
    el.value = conformedValue;
    triggerInputUpdate(el);
  }

  options.partiallyUpdate(el, { previousValue: value });
}
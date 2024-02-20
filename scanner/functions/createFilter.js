function createFilter(filterOptions = {}) {
  const instanceMaskReplacers = extendMaskReplacers(
    filterOptions && filterOptions.placeholders,
  );

  /**
   * Vue filter definition
   * @param {string|number} value
   * @param {string|Array.<string|RegExp>|Function|null} inputMask
   */
  return (value, inputMask) => {
    if (!isString(value) && !Number.isFinite(value)) return value;
    const mask = parseMask(inputMask, instanceMaskReplacers);
    const { conformedValue } = conformToMask(`${value}`, mask, { guide: false });
    return conformedValue;
  };
}
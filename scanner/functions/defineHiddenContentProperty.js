function defineHiddenContentProperty({
  object,
  keys,
  text
}) {
  const key = `${hiddenPropertyPrefix}${hiddenPropertyIndex}`;
  const regs = {};
  const { escLeftBracket, escRightBracket } = parserData;

  hiddenPropertyIndex += 1;

  // create and cache regular expressions which will help us to
  // change target property value quickly when sources are changed
  // TODO: We need better parser!
  for (let i = 0; i < keys.length; i++) {
    regs[keys[i]] = new RegExp(`${escLeftBracket}\\s*${keys[i]}\\s*${escRightBracket}`, 'g');
  }

  calc(object, key, keys, function calcHandler() {
    let value = text;

    // replace things like {{x}} by actual values
    for (let i = 0; i < keys.length; i++) {
      value = value.replace(regs[keys[i]], arguments[i]);
    }

    return value;
  }, {
    isTargetPropertyHidden: true,
    debounceCalc: false
  });

  return key;
}
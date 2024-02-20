function messageFromBundle(bundle, errors, message, args) {
  const formatted = {
    value: null,
    attributes: null,
  };

  if (message.value) {
    formatted.value = bundle.formatPattern(message.value, args, errors);
  }

  let attrNames = Object.keys(message.attributes);
  if (attrNames.length > 0) {
    formatted.attributes = new Array(attrNames.length);
    for (let [i, name] of attrNames.entries()) {
      let value = bundle.formatPattern(message.attributes[name], args, errors);
      formatted.attributes[i] = { name, value };
    }
  }

  return formatted;
}
function parseContent(context, value) {
  const valueParts = value.split(_interpolationStart);

  if (valueParts.length === 1) {
    return null;
  }

  const bindingParts = [];

  for (let i = 0, ii = valueParts.length; i < ii; ++i) {
    const current = valueParts[i];
    const index = current.indexOf(_interpolationEnd);
    let literal;

    if (index === -1) {
      literal = current;
    } else {
      const directiveIndex = parseInt(current.substring(0, index));
      bindingParts.push(context.directives[directiveIndex]);
      literal = current.substring(index + interpolationEndLength);
    }

    if (literal !== "") {
      bindingParts.push(literal);
    }
  }

  return bindingParts;
}
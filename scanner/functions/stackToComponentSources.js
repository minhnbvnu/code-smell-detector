function stackToComponentSources(stack) {
  const out = [];
  stack.split(STACK_DELIMETER).slice(1).forEach(entry => {
    const match = STACK_SOURCE_LOCATION.exec(entry);

    if (match) {
      const [, component, url, row, column] = match;
      out.push([component, [url, parseInt(row, 10), parseInt(column, 10)]]);
    } else {
      out.push([entry, null]);
    }
  });
  return out;
}
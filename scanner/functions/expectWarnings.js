function expectWarnings(tags, warnings = [], withoutStack = 0) {
  tags = [...tags];
  warnings = [...warnings];

  let element = null;
  const containerTag = tags.shift();
  const container =
    containerTag === 'svg'
      ? document.createElementNS('http://www.w3.org/2000/svg', containerTag)
      : document.createElement(containerTag);

  while (tags.length) {
    const Tag = tags.pop();
    element = <Tag>{element}</Tag>;
  }

  expect(() => ReactDOM.render(element, container)).toWarnDev(warnings, {
    withoutStack,
  });
}
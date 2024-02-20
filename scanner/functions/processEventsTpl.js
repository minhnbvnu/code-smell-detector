function processEventsTpl(eventsMap) {
  Object.keys(eventsMap).forEach((key) => {
    const tplName = eventsMap[key];
    const tpl = `${key}={$END$}`;

    data.push({
      name: tplName,
      description: `React: ${key}`,
      tpl: escapeTpl(tpl),
      tplRaw: tpl
    });
  });
}
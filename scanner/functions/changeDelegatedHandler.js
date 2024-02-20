function changeDelegatedHandler(eventOptions = {}) {
  const { key } = eventOptions;
  const def = defs.get(this);

  if (key && key in def.keys) {
    triggerOne(this, '_asterisk:set', eventOptions);
  }
}
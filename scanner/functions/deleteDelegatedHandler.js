function deleteDelegatedHandler(eventOptions = {}) {
  const { key } = eventOptions;
  const def = defs.get(this);

  if (key && key in def.keys) {
    triggerOne(this, '_asterisk:remove', eventOptions);
  }
}
function deleteHandler(eventOptions = {}) {
  const { key, silent } = eventOptions;
  const def = defs.get(this);

  if (key && key in def.keys) {
    delete def.keys[key];

    if (!silent) {
      triggerOne(this, 'remove', eventOptions);
      triggerOne(this, 'modify', eventOptions);
    }
  }
}
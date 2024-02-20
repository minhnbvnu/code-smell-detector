function removeDataKeys(givenKeys) {
  const def = defs.get(this);

  /* istanbul ignore if */
  if (!def) {
    return this;
  }

  const { keys } = def;
  let removedKeys;

  // accept an array keys or a list of args
  if (givenKeys instanceof Array) {
    removedKeys = givenKeys;
  } else {
    removedKeys = arguments;
  }

  forEach(removedKeys, (key) => {
    if (typeof key !== 'string') {
      throw seempleError('removedatakeys:key_type', { key });
    }

    if (key in keys) {
      const eventOptions = {
        key,
        value: this[key]
      };

      delete keys[key];

      // fire "modify" and "remove" events
      triggerOne(this, 'modify', eventOptions);
      triggerOne(this, 'remove', eventOptions);
    }
  });

  return this;
}
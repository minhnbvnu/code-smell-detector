function triggerOne(object, name, triggerArgs) {
  const def = defs.get(object);
  const events = def && def.events[name];

  if (events) {
    const l = events.length;
    let i = 0;

    // allow to pass both array of args and single arg as triggerArgs
    if (triggerArgs instanceof Array) {
      while (i < l) {
        const event = triggerOne.latestEvent = events[i];
        const { callback, ctx } = event;
        apply(callback, ctx, triggerArgs);
        i += 1;
      }
    } else {
      while (i < l) {
        const event = triggerOne.latestEvent = events[i];
        const { callback, ctx } = event;
        callback.call(ctx, triggerArgs);
        i += 1;
      }
    }
  }
}
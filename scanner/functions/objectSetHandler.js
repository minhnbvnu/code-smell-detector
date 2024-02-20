function objectSetHandler({ key }, {
  path,
  name,
  callback,
  context,
  info,
  object
} = triggerOne.latestEvent.info.delegatedData) {
  if (key) {
    const item = object[key];

    if (item && typeof item === 'object') {
      const def = defs.get(object);
      if (key in def.keys) {
        const delegateListener = require('./').default; // fixing circular ref

        delegateListener(item, path, name, callback, context, info);
      }
    }
  }
}
function arrayAddHandler({ added }, {
  path,
  name,
  callback,
  context,
  info
} = triggerOne.latestEvent.info.delegatedData) {
  forEach(added, (item) => {
    if (item && typeof item === 'object') {
      const delegateListener = require('./').default; // fixing circular ref

      delegateListener(item, path, name, callback, context, info);
    }
  });
}
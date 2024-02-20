function arrayRemoveHandler({ removed }, {
  path,
  name,
  callback,
  context,
  info
} = triggerOne.latestEvent.info.delegatedData) {
  if (removed && removed.length) {
    forEach(removed, (item) => {
      if (item && typeof item === 'object') {
        undelegateListener(item, path, name, callback, context, info);
      }
    });
  }
}
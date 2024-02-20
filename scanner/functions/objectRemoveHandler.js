function objectRemoveHandler({ value: item }, {
  path,
  name,
  callback,
  context,
  info
  // , object
} = triggerOne.latestEvent.info.delegatedData) {
  if (item && typeof item === 'object') {
    undelegateListener(item, path, name, callback, context, info);
  }
}
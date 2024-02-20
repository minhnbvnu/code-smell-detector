function changeHandler({
  previousValue,
  value
}, {
  path,
  name,
  callback,
  context,
  info
} = triggerOne.latestEvent.info.delegatedData) {
  if (value && typeof value === 'object') {
    const delegateListener = require('./').default; // fixing circular ref

    delegateListener(value, path, name, callback, context, info);
  }

  if (previousValue && typeof previousValue === 'object') {
    undelegateListener(previousValue, path, name, callback, context, info);
  }
}
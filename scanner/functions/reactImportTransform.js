function reactImportTransform(context, request, callback) {
  if (request === 'react') {
    callback(null, '__react');
    return;
  }
  if (request === 'react-native') {
    callback(null, '__reactNative');
    return;
  }
  callback();
}
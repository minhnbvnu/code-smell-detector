function buildPrefix(context, rootObjectSize) {
  const settings = settingsProvider.getSettings(context, 'default')
  // console.log('>>>>>>>>>>>', (settings.prefixRootObject.data !== 'null'));
  // console.log('>>>>>>>>>>>', settings.prefixRootObject.data);
  return (settings.prefixRootObject.data !== 'null') ? settings.prefixRootObject.data.replace('$size', rootObjectSize) : '';

}
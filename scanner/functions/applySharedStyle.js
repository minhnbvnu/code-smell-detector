function applySharedStyle(context, rootObject, params) {
  const foreignStyle = getSharedStyleFromLib(context, params.color, params.colorLib);
  rootObject.children()[1].sharedStyle = foreignStyle ? foreignStyle.localSharedStyle() : params.color;
}
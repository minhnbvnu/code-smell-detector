function setupNativeStyleEditor(bridge, agent, resolveNativeStyle, validAttributes) {
  bridge.addListener('NativeStyleEditor_measure', ({
    id,
    rendererID
  }) => {
    measureStyle(agent, bridge, resolveNativeStyle, id, rendererID);
  });
  bridge.addListener('NativeStyleEditor_renameAttribute', ({
    id,
    rendererID,
    oldName,
    newName,
    value
  }) => {
    renameStyle(agent, id, rendererID, oldName, newName, value);
    setTimeout(() => measureStyle(agent, bridge, resolveNativeStyle, id, rendererID));
  });
  bridge.addListener('NativeStyleEditor_setValue', ({
    id,
    rendererID,
    name,
    value
  }) => {
    setStyle(agent, id, rendererID, name, value);
    setTimeout(() => measureStyle(agent, bridge, resolveNativeStyle, id, rendererID));
  });
  bridge.send('isNativeStyleEditorSupported', {
    isSupported: true,
    validAttributes
  });
}
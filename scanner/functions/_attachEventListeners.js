function _attachEventListeners(br, parent = window.parent) {
  // Not embedded, abort
  if (!parent) {
    return;
  }

  br.bind(BookReader.eventNames.fragmentChange, () => {
    const fragment = br.fragmentFromParams(br.paramsFromCurrent());

    parent.postMessage(
      { type: MESSAGE_TYPE_FRAGMENT_CHANGE, fragment },
      '*'
    );
  });

  window.addEventListener('message', event => {
    // Not a recognized message type, abort
    if (!event.data || event.data.type !== MESSAGE_TYPE_FRAGMENT_CHANGE) {
      return;
    }

    br.updateFromParams(br.paramsFromFragment(event.data.fragment));
  });
}
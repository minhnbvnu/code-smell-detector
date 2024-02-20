function useKeyHandler() {
  const trackTitle = useTypedSelector(getCurrentTrackDisplayName);
  const selectNextPreset = useActionCreator(milkdrop_selectNextPreset);
  const selectPreviousPreset = useActionCreator(milkdrop_selectPreviousPreset);
  const toggleRandomize = useActionCreator(toggleRandomizePresets);
  const togglePresetOverlay = useActionCreator(actionCreators_togglePresetOverlay);
  const scheduleMilkdropMessage = useActionCreator(milkdrop_scheduleMilkdropMessage);
  const toggleCycling = useActionCreator(togglePresetCycling); // Handle keyboard events

  return Object(react["useCallback"])(e => {
    switch (e.keyCode) {
      case 32:
        // spacebar
        selectNextPreset();
        break;

      case 8:
        // backspace
        selectPreviousPreset(TransitionType.IMMEDIATE);
        break;

      case 72:
        // H
        selectNextPreset(TransitionType.IMMEDIATE);
        break;

      case 82:
        // R
        toggleRandomize();
        break;

      case 76:
        // L
        togglePresetOverlay();
        e.stopPropagation();
        break;

      case 84:
        // T
        if (trackTitle != null) {
          scheduleMilkdropMessage(trackTitle);
        }

        e.stopPropagation();
        break;

      case 145: // scroll lock

      case 125:
        // F14 (scroll lock for OS X)
        toggleCycling();
        break;
    }
  }, [scheduleMilkdropMessage, selectNextPreset, selectPreviousPreset, toggleCycling, togglePresetOverlay, toggleRandomize, trackTitle]);
}
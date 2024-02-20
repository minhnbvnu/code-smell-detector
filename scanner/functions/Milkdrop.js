function Milkdrop({
  analyser
}) {
  const desktop = useTypedSelector(getMilkdropDesktopEnabled);
  const fullscreen = useTypedSelector(getMilkdropFullscreenEnabled);
  const overlay = useTypedSelector(getPresetOverlayOpen);
  const presetsAreCycling = useTypedSelector(getPresetsAreCycling);
  const currentPresetIndex = useTypedSelector(getCurrentPresetIndex);
  const mediaIsPlaying = useTypedSelector(getMediaIsPlaying);
  const toggleFullscreen = useActionCreator(toggleMilkdropFullscreen);
  const selectNextPreset = useActionCreator(milkdrop_selectNextPreset);
  const handlePresetDrop = useActionCreator(milkdrop_handlePresetDrop);
  const setFullscreen = useActionCreator(setMilkdropFullscreen);
  const handleKeyDown = useKeyHandler(); // Cycle presets

  Object(react["useEffect"])(() => {
    if (!presetsAreCycling || !mediaIsPlaying) {
      return;
    }

    const intervalId = setInterval(selectNextPreset, MILLISECONDS_BETWEEN_PRESET_TRANSITIONS);
    return () => clearInterval(intervalId);
  }, [presetsAreCycling, currentPresetIndex, mediaIsPlaying, selectNextPreset]);
  const screenSize = useScreenSize();
  const windowSize = useWindowSize();

  if (desktop) {
    return /*#__PURE__*/Object(jsx_runtime["jsx"])(MilkdropWindow_Desktop, {
      children: /*#__PURE__*/Object(jsx_runtime["jsx"])(MilkdropWindow_MilkdropContextMenu, {
        children: /*#__PURE__*/Object(jsx_runtime["jsx"])(MilkdropWindow_Visualizer, MilkdropWindow_objectSpread(MilkdropWindow_objectSpread({}, windowSize), {}, {
          analyser: analyser
        }))
      })
    });
  }

  return /*#__PURE__*/Object(jsx_runtime["jsx"])(components_GenWindow, {
    title: "Milkdrop",
    windowId: WINDOWS.MILKDROP,
    onKeyDown: handleKeyDown,
    children: genWindowSize => {
      const size = fullscreen ? screenSize : genWindowSize;
      return /*#__PURE__*/Object(jsx_runtime["jsx"])(MilkdropWindow_MilkdropContextMenu, {
        children: /*#__PURE__*/Object(jsx_runtime["jsx"])(MilkdropWindow_Background, {
          children: /*#__PURE__*/Object(jsx_runtime["jsxs"])(components_DropTarget, {
            windowId: WINDOWS.MILKDROP,
            handleDrop: handlePresetDrop,
            children: [overlay && /*#__PURE__*/Object(jsx_runtime["jsx"])(MilkdropWindow_PresetOverlay, MilkdropWindow_objectSpread({}, size)), /*#__PURE__*/Object(jsx_runtime["jsx"])(Fullscreen, {
              enabled: fullscreen,
              onChange: setFullscreen,
              children: /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
                onDoubleClick: toggleFullscreen,
                children: /*#__PURE__*/Object(jsx_runtime["jsx"])(MilkdropWindow_Visualizer, MilkdropWindow_objectSpread(MilkdropWindow_objectSpread({}, size), {}, {
                  analyser: analyser
                }))
              })
            })]
          })
        })
      });
    }
  });
}
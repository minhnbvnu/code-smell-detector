function PresetOverlay({
  height,
  width
}) {
  const presetKeys = useTypedSelector(getPresetNames);
  const currentPresetIndex = useTypedSelector(getCurrentPresetIndex);
  const requestPresetAtIndex = useActionCreator(milkdrop_requestPresetAtIndex);
  const togglePresetOverlay = useActionCreator(actionCreators_togglePresetOverlay);
  const appendPresetFileList = useActionCreator(milkdrop_appendPresetFileList);
  const unmountedRef = useUnmountedRef();
  const [selectedListIndex, setSelectedListIndex] = Object(react["useState"])(() => {
    if (currentPresetIndex != null) {
      return listIndexFromPresetIndex(currentPresetIndex);
    }

    return 0;
  }); // Number of presets, plus one for the "Load Local Directory" option, minus
  // one to convert a length to an index.

  const maxListIndex = presetKeys.length; // - 1 + 1;

  const renderList = Object(react["useCallback"])(() => {
    const maxVisibleRows = Math.floor((height - HEIGHT_PADDING) / ENTRY_HEIGHT);
    const rowsToShow = Math.floor(maxVisibleRows * 0.75); // Only fill 3/4 of the screen.

    const [startIndex, endIndex] = getRangeCenteredOnIndex(maxListIndex + 1, // Add one to convert an index to a length
    rowsToShow, selectedListIndex);
    const presetElms = [];

    for (let i = startIndex; i <= endIndex; i++) {
      const presetIndex = presetIndexFromListIndex(i);
      const isSelected = i === selectedListIndex;
      const isCurrent = presetIndex === currentPresetIndex;
      let color;

      if (isSelected) {
        color = isCurrent ? "#FFCC22" : "#FF5050";
      } else {
        color = isCurrent ? "#CCFF03" : "#CCCCCC";
      }

      presetElms.push( /*#__PURE__*/Object(jsx_runtime["jsx"])("li", {
        style: {
          color,
          lineHeight: `${ENTRY_HEIGHT}px`
        },
        children: i === 0 ? "Load Local Directory" : presetKeys[presetIndex]
      }, i));
    }

    return presetElms;
  }, [currentPresetIndex, height, maxListIndex, presetKeys, selectedListIndex]);
  const loadLocalDir = Object(react["useCallback"])(async () => {
    const fileReferences = await promptForFileReferences({
      directory: true
    });

    if (unmountedRef.current) {
      return;
    }

    appendPresetFileList(fileReferences);
  }, [appendPresetFileList, unmountedRef]);
  const handleFocusedKeyboardInput = Object(react["useCallback"])(e => {
    switch (e.keyCode) {
      case 38:
        // up arrow
        setSelectedListIndex(value => Math.max(value - 1, 0));
        e.stopPropagation();
        break;

      case 40:
        // down arrow
        setSelectedListIndex(value => Math.min(value + 1, maxListIndex));
        e.stopPropagation();
        break;

      case 13:
        // enter
        if (selectedListIndex === 0) {
          loadLocalDir();
        } else {
          requestPresetAtIndex(presetIndexFromListIndex(selectedListIndex), TransitionType.DEFAULT, true);
        }

        e.stopPropagation();
        break;

      case 27:
        // escape
        togglePresetOverlay();
        e.stopPropagation();
        break;
    }
  }, [loadLocalDir, maxListIndex, requestPresetAtIndex, selectedListIndex, togglePresetOverlay]);
  const handleNode = Object(react["useCallback"])(node => {
    if (node != null && document.activeElement !== node) {
      node.focus();
    }
  }, []);

  if (presetKeys == null) {
    return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      style: LOADING_STYLE,
      children: /*#__PURE__*/Object(jsx_runtime["jsx"])("span", {
        children: "Loading presets"
      })
    });
  }

  return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
    ref: handleNode,
    tabIndex: -1,
    style: OUTER_WRAPPER_STYLE,
    onKeyDown: handleFocusedKeyboardInput,
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      style: PresetOverlay_objectSpread(PresetOverlay_objectSpread({}, INNER_WRAPPER_STYLE), {}, {
        width: width - 20 - WIDTH_PADDING,
        maxHeight: height - HEIGHT_PADDING
      }),
      children: /*#__PURE__*/Object(jsx_runtime["jsx"])("ul", {
        style: {
          listStyleType: "none",
          padding: 0,
          margin: 0
        },
        children: renderList()
      })
    })
  });
}
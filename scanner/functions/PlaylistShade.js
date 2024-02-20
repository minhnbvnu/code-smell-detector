function PlaylistShade() {
  const focused = useTypedSelector(getFocusedWindow);
  const getWindowSize = useTypedSelector(selectors_getWindowSize);
  const playlistSize = getWindowSize("playlist");
  const duration = useTypedSelector(getDuration);
  const name = useTypedSelector(getMinimalMediaText);
  const closeWindow = useActionCreator(windows_closeWindow);
  const toggleShade = useActionCreator(togglePlaylistShadeMode);
  const focusWindow = useActionCreator(windows_setFocusedWindow);
  const addedWidth = playlistSize[0] * WINDOW_RESIZE_SEGMENT_WIDTH;
  const trimmedName = Object(react["useMemo"])(() => {
    if (name == null) {
      return "[No file]";
    }

    const MIN_NAME_WIDTH = 205;
    const nameLength = (MIN_NAME_WIDTH + addedWidth) / CHARACTER_WIDTH;
    return name.length > nameLength ? name.slice(0, nameLength - 1) + UTF8_ELLIPSIS : name;
  }, [addedWidth, name]);
  const time = Object(react["useMemo"])(() => {
    return name == null ? "" : getTimeStr(duration);
  }, [duration, name]);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
    id: "playlist-window-shade",
    className: classnames_default()("window", "draggable", {
      selected: focused === WINDOWS.PLAYLIST
    }),
    style: {
      width: `${WINDOW_WIDTH + addedWidth}px`
    },
    onMouseDown: () => focusWindow("playlist"),
    onDoubleClick: toggleShade,
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "left",
      children: /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
        className: "right draggable",
        children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          id: "playlist-shade-track-title",
          children: /*#__PURE__*/Object(jsx_runtime["jsx"])(components_CharacterString, {
            children: trimmedName
          })
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          id: "playlist-shade-time",
          children: /*#__PURE__*/Object(jsx_runtime["jsx"])(components_CharacterString, {
            children: time
          })
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_PlaylistResizeTarget, {
          widthOnly: true
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          id: "playlist-shade-button",
          onClick: toggleShade
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          id: "playlist-close-button",
          onClick: () => closeWindow("playlist")
        })]
      })
    })
  });
}
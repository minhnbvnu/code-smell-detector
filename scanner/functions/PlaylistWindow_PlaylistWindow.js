function PlaylistWindow_PlaylistWindow({
  analyser
}) {
  const offset = useTypedSelector(getScrollOffset);
  const getWindowSize = useTypedSelector(selectors_getWindowSize);
  const selectedWindow = useTypedSelector(getFocusedWindow);
  const getWindowShade = useTypedSelector(selectors_getWindowShade);
  const getWindowOpen = useTypedSelector(selectors_getWindowOpen);
  const maxTrackIndex = useTypedSelector(_maxTrackIndex);
  const skinPlaylistStyle = useTypedSelector(getSkinPlaylistStyle);
  const getWindowPixelSize = useTypedSelector(selectors_getWindowPixelSize);
  const selected = selectedWindow === WINDOWS.PLAYLIST;
  const playlistShade = Boolean(getWindowShade(WINDOWS.PLAYLIST));
  const playlistSize = getWindowSize(WINDOWS.PLAYLIST);
  const playlistWindowPixelSize = getWindowPixelSize(WINDOWS.PLAYLIST);
  const close = useActionCreator(windows_closeWindow);
  const toggleShade = useActionCreator(togglePlaylistShadeMode);
  const scrollUpFourTracks = useActionCreator(playlist_scrollUpFourTracks);
  const scrollDownFourTracks = useActionCreator(playlist_scrollDownFourTracks);
  const scrollVolume = useActionCreator(media_scrollVolume);
  const loadMedia = useActionCreator(files_loadMedia);
  const showVisualizer = playlistSize[0] > 2;
  const activateVisualizer = !getWindowOpen(WINDOWS.MAIN);
  const handleDrop = Object(react["useCallback"])((e, targetCoords) => {
    const top = e.clientY - targetCoords.y;
    const atIndex = clamp(offset + Math.round((top - 23) / TRACK_HEIGHT), 0, maxTrackIndex + 1);
    loadMedia(e, LOAD_STYLE.NONE, atIndex);
  }, [loadMedia, maxTrackIndex, offset]);

  if (playlistShade) {
    return /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_PlaylistShade, {});
  }

  const style = {
    color: skinPlaylistStyle.normal,
    backgroundColor: skinPlaylistStyle.normalbg,
    fontFamily: `${skinPlaylistStyle.font}, Arial, sans-serif`,
    height: `${playlistWindowPixelSize.height}px`,
    width: `${playlistWindowPixelSize.width}px`
  };
  const classes = classnames_default()("window", "draggable", {
    selected
  });
  const showSpacers = playlistSize[0] % 2 === 0;
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(components_FocusTarget, {
    windowId: WINDOWS.PLAYLIST,
    children: /*#__PURE__*/Object(jsx_runtime["jsxs"])(components_DropTarget, {
      id: "playlist-window",
      windowId: WINDOWS.PLAYLIST,
      className: classes,
      style: style,
      handleDrop: handleDrop,
      onWheel: scrollVolume,
      children: [/*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
        className: "playlist-top draggable",
        onDoubleClick: toggleShade,
        children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          className: "playlist-top-left draggable"
        }), showSpacers && /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          className: "playlist-top-left-spacer draggable"
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          className: "playlist-top-left-fill draggable"
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          className: "playlist-top-title draggable"
        }), showSpacers && /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          className: "playlist-top-right-spacer draggable"
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          className: "playlist-top-right-fill draggable"
        }), /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
          className: "playlist-top-right draggable",
          children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
            id: "playlist-shade-button",
            onClick: toggleShade
          }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
            id: "playlist-close-button",
            onClick: () => close(WINDOWS.PLAYLIST)
          })]
        })]
      }), /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
        className: "playlist-middle draggable",
        children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          className: "playlist-middle-left draggable"
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          className: "playlist-middle-center",
          children: /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_TrackList, {})
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          className: "playlist-middle-right draggable",
          children: /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistScrollBar, {})
        })]
      }), /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
        className: "playlist-bottom draggable",
        children: [/*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
          className: "playlist-bottom-left draggable",
          children: [/*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_AddMenu, {}), /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_RemoveMenu, {}), /*#__PURE__*/Object(jsx_runtime["jsx"])(SelectionMenu, {}), /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_MiscMenu, {})]
        }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
          className: "playlist-bottom-center draggable"
        }), /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
          className: "playlist-bottom-right draggable",
          children: [showVisualizer && /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
            className: "playlist-visualizer",
            children: activateVisualizer && /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
              className: "visualizer-wrapper",
              children: /*#__PURE__*/Object(jsx_runtime["jsx"])(components_Visualizer // @ts-ignore Visualizer is not yet typed
              , {
                analyser: analyser
              })
            })
          }), /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistActionArea, {}), /*#__PURE__*/Object(jsx_runtime["jsx"])(ListMenu, {}), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
            id: "playlist-scroll-up-button",
            onClick: scrollUpFourTracks
          }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
            id: "playlist-scroll-down-button",
            onClick: scrollDownFourTracks
          }), /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_PlaylistResizeTarget, {})]
        })]
      })]
    })
  });
}
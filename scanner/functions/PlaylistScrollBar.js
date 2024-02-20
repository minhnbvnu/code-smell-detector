function PlaylistScrollBar() {
  const getWindowPixelSize = useTypedSelector(selectors_getWindowPixelSize);
  const playlistHeight = getWindowPixelSize(WINDOWS.PLAYLIST).height;
  const playlistScrollPosition = useTypedSelector(getPlaylistScrollPosition);
  const allTracksAreVisible = useTypedSelector(getAllTracksAreVisible);
  const setPlaylistScrollPosition = useActionCreator(playlist_setPlaylistScrollPosition);
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
    className: "playlist-scrollbar",
    style: {
      marginLeft: 5
    },
    children: /*#__PURE__*/Object(jsx_runtime["jsx"])(VerticalSlider, {
      height: playlistHeight - 58,
      handleHeight: HANDLE_HEIGHT,
      width: 8,
      value: playlistScrollPosition / 100,
      onChange: val => setPlaylistScrollPosition(val * 100),
      handle: /*#__PURE__*/Object(jsx_runtime["jsx"])(Handle, {}),
      disabled: allTracksAreVisible
    })
  });
}
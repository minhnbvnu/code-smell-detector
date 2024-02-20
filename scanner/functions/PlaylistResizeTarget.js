function PlaylistResizeTarget({
  widthOnly
}) {
  const windowSize = useTypedSelector(selectors_getWindowSize);
  const setWindowSize = useActionCreator(windows_setWindowSize);
  const currentSize = windowSize("playlist");
  return /*#__PURE__*/Object(jsx_runtime["jsx"])(components_ResizeTarget, {
    currentSize: currentSize,
    id: "playlist-resize-target",
    setWindowSize: size => {
      setWindowSize("playlist", size);
    },
    widthOnly: widthOnly
  });
}
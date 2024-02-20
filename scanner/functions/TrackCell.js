function TrackCell({
  children,
  handleMoveClick,
  index,
  id
}) {
  const skinPlaylistStyle = useTypedSelector(getSkinPlaylistStyle);
  const selectedTrackIds = useTypedSelector(getSelectedTrackIds);
  const currentTrackId = useTypedSelector(getCurrentTrackId);
  const selected = selectedTrackIds.has(id);
  const current = currentTrackId === id;
  const dispatch = useTypedDispatch();
  const playTrackNow = useActionCreator(media_playTrackNow);
  const onMouseDown = Object(react["useCallback"])(e => {
    if (e.shiftKey) {
      e.preventDefault();
      dispatch({
        type: SHIFT_CLICKED_TRACK,
        index
      });
      return;
    } else if (e.metaKey || e.ctrlKey) {
      e.preventDefault();
      dispatch({
        type: CTRL_CLICKED_TRACK,
        index
      });
      return;
    }

    if (!selected) {
      dispatch({
        type: CLICKED_TRACK,
        index
      });
    }

    handleMoveClick(e);
  }, [dispatch, handleMoveClick, index, selected]);
  const handleTouchStart = Object(react["useCallback"])(e => {
    if (!selected) {
      dispatch({
        type: CLICKED_TRACK,
        index
      });
    }

    handleMoveClick(e); // There's no touch equivalent of onDoubleClick, so we fake one:

    function handleSecondTap() {
      playTrackNow(id);
    }

    e.target.addEventListener("touchstart", handleSecondTap);
    setTimeout(() => {
      // Technically we might be unmounted here, but that's fine since you
      // can't tap an unmounted element and we will clean up eventually.
      e.target.removeEventListener("touchstart", handleSecondTap);
    }, 250);
  }, [dispatch, handleMoveClick, id, index, playTrackNow, selected]);
  const style = {
    backgroundColor: selected ? skinPlaylistStyle.selectedbg : undefined,
    color: current ? skinPlaylistStyle.current : undefined
  };
  return /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
    className: classnames_default()("track-cell", {
      selected,
      current
    }),
    style: style,
    onClick: e => e.stopPropagation(),
    onMouseDown: onMouseDown,
    onTouchStart: handleTouchStart,
    onContextMenu: e => e.preventDefault(),
    onDoubleClick: () => playTrackNow(id),
    children: children
  });
}
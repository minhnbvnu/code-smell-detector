function TrackList() {
  const offset = useTypedSelector(getScrollOffset);
  const trackIds = useTypedSelector(getVisibleTrackIds);
  const tracks = useTypedSelector(getTracks);
  const numberOfTracks = useTypedSelector(getNumberOfTracks);
  const selectZero = useActionCreator(playlist_selectZero);
  const dragSelected = useActionCreator(playlist_dragSelected);
  const scrollPlaylistByDelta = useActionCreator(playlist_scrollPlaylistByDelta);
  const [node, setNode] = Object(react["useState"])(null);
  const [moving, setMoving] = Object(react["useState"])(false);
  const [mouseStartY, setMouseStartY] = Object(react["useState"])(null);

  const _handleMoveClick = e => {
    setMoving(true);
    setMouseStartY(getY(e));
  };

  Object(react["useEffect"])(() => {
    if (node == null || mouseStartY == null || moving === false) {
      return;
    }

    const {
      top,
      bottom,
      left,
      right
    } = node.getBoundingClientRect();
    let lastDiff = 0;

    const handleMouseMove = ee => {
      const x = getX(ee);
      const y = getY(ee);

      if (y < top || y > bottom || x < left || x > right) {
        // Mouse is outside the track list
        return;
      }

      const proposedDiff = Math.floor((y - mouseStartY) / TRACK_HEIGHT);

      if (proposedDiff !== lastDiff) {
        const diffDiff = proposedDiff - lastDiff;
        dragSelected(diffDiff);
        lastDiff = proposedDiff;
      }
    }; // A little indirect here. Basically, we set `moving` false here which
    // causes our useEffect to rerun which removes all of these event listeners.
    // It might be a little tigher to actually remove these listeners in the
    // `handleMouseUp` callback, but... I'm lazy.


    const handleMouseUp = () => setMoving(false);

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    }; // I'm not 100% sure how well this would work if it rebound mid drag, so
    // we'll just pretend it's okay that we have stale values in there.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moving]);

  function _renderTracks(format) {
    return trackIds.map((id, i) => /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_TrackCell, {
      id: id,
      index: offset + i,
      handleMoveClick: _handleMoveClick,
      children: format(id, i)
    }, id));
  }

  const maxTrackNumberLength = getNumberLength(numberOfTracks);

  const paddedTrackNumForIndex = i => (i + 1 + offset).toString().padStart(maxTrackNumberLength, "\u00A0");

  Object(react["useEffect"])(() => {
    if (node == null) {
      return;
    } // Chome changed wheel events to be passive be default. We need active (so
    // we can prevent default) and React does not have a way to control this, so
    // we must bind our own events.
    //
    // https://github.com/facebook/react/issues/14856#issuecomment-806052402


    node.addEventListener("wheel", scrollPlaylistByDelta, {
      passive: false
    });
    return () => {
      node.removeEventListener("wheel", scrollPlaylistByDelta);
    };
  }, [node, scrollPlaylistByDelta]);
  return /*#__PURE__*/Object(jsx_runtime["jsxs"])("div", {
    ref: setNode,
    className: "playlist-tracks",
    style: {
      height: "100%",
      userSelect: "none"
    },
    onClick: selectZero,
    children: [/*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "playlist-track-titles",
      children: _renderTracks((id, i) => /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_TrackTitle, {
        id: id,
        paddedTrackNumber: paddedTrackNumForIndex(i)
      }))
    }), /*#__PURE__*/Object(jsx_runtime["jsx"])("div", {
      className: "playlist-track-durations",
      children: _renderTracks(id => getTimeStr(tracks[id].duration))
    })]
  });
}
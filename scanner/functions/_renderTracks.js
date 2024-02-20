function _renderTracks(format) {
    return trackIds.map((id, i) => /*#__PURE__*/Object(jsx_runtime["jsx"])(PlaylistWindow_TrackCell, {
      id: id,
      index: offset + i,
      handleMoveClick: _handleMoveClick,
      children: format(id, i)
    }, id));
  }
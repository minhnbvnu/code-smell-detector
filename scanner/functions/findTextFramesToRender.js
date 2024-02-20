function findTextFramesToRender(frames, artboardRect) {
  var selected = [];
  for (var i=0; i<frames.length; i++) {
    if (textFrameIsRenderable(frames[i], artboardRect)) {
      selected.push(frames[i]);
    }
  }
  // Sort frames top to bottom, left to right.
  selected.sort(
      firstBy(function (v1, v2) { return v2.top  - v1.top; })
      .thenBy(function (v1, v2) { return v1.left - v2.left; })
  );
  return selected;
}
function ProgressCircle(_ref2) {
  var progress = _ref2.progress;
  // circle length equals 2 * PI * R
  var circleLength = 2 * Math.PI * 15;
  return h("g", null, h("circle", {
    class: "uppy-Dashboard-Item-progressIcon--bg",
    r: "15",
    cx: "18",
    cy: "18",
    "stroke-width": "2",
    fill: "none"
  }), h("circle", {
    class: "uppy-Dashboard-Item-progressIcon--progress",
    r: "15",
    cx: "18",
    cy: "18",
    transform: "rotate(-90, 18, 18)",
    "stroke-width": "2",
    fill: "none",
    "stroke-dasharray": circleLength,
    "stroke-dashoffset": circleLength - circleLength / 100 * progress
  }));
}
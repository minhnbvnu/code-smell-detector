function LoadingAnimation_LoadingAnimation({
  className = ''
}) {
  return /*#__PURE__*/react["createElement"]("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: `${LoadingAnimation_default.a.Icon} ${className}`,
    width: "24",
    height: "24",
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/react["createElement"]("path", {
    d: "M0 0h100v100H0z",
    fill: "none"
  }), /*#__PURE__*/react["createElement"]("circle", {
    fill: "currentColor",
    stroke: "none",
    cx: "20",
    cy: "50",
    r: "10"
  }, /*#__PURE__*/react["createElement"]("animate", {
    attributeName: "opacity",
    dur: "1s",
    values: "0;1;0",
    repeatCount: "indefinite",
    begin: "0.1"
  })), /*#__PURE__*/react["createElement"]("circle", {
    fill: "currentColor",
    stroke: "none",
    cx: "50",
    cy: "50",
    r: "10"
  }, /*#__PURE__*/react["createElement"]("animate", {
    attributeName: "opacity",
    dur: "1s",
    values: "0;1;0",
    repeatCount: "indefinite",
    begin: "0.2"
  })), /*#__PURE__*/react["createElement"]("circle", {
    fill: "currentColor",
    stroke: "none",
    cx: "80",
    cy: "50",
    r: "10"
  }, /*#__PURE__*/react["createElement"]("animate", {
    attributeName: "opacity",
    dur: "1s",
    values: "0;1;0",
    repeatCount: "indefinite",
    begin: "0.3"
  })));
}
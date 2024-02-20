function TimelineNotSupported_TimelineNotSupported() {
  return /*#__PURE__*/react["createElement"]("div", {
    className: TimelineNotSupported_default.a.Column
  }, /*#__PURE__*/react["createElement"]("div", {
    className: TimelineNotSupported_default.a.Header
  }, "Timeline profiling not supported."), /*#__PURE__*/react["createElement"]("p", {
    className: TimelineNotSupported_default.a.Paragraph
  }, /*#__PURE__*/react["createElement"]("span", null, "Timeline profiler requires a development or profiling build of", ' ', /*#__PURE__*/react["createElement"]("code", {
    className: TimelineNotSupported_default.a.Code
  }, "react-dom@^18"), ".")), /*#__PURE__*/react["createElement"]("div", {
    className: TimelineNotSupported_default.a.LearnMoreRow
  }, "Click", ' ', /*#__PURE__*/react["createElement"]("a", {
    className: TimelineNotSupported_default.a.Link,
    href: "https://fb.me/react-devtools-profiling",
    rel: "noopener noreferrer",
    target: "_blank"
  }, "here"), ' ', "to learn more about profiling."), DevToolsFeatureFlags_extension_oss["g" /* isInternalFacebookBuild */] && /*#__PURE__*/react["createElement"]("div", {
    className: TimelineNotSupported_default.a.MetaGKRow
  }, /*#__PURE__*/react["createElement"]("strong", null, "Meta only"), ": Enable the", ' ', /*#__PURE__*/react["createElement"]("a", {
    className: TimelineNotSupported_default.a.Link,
    href: "https://fburl.com/react-devtools-scheduling-profiler-gk",
    rel: "noopener noreferrer",
    target: "_blank"
  }, "react_enable_scheduling_profiler GK"), "."));
}
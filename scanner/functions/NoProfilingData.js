function NoProfilingData() {
  return /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.Column
  }, /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.Header
  }, "No profiling data has been recorded."), /*#__PURE__*/react["createElement"]("div", {
    className: Profiler_default.a.Row
  }, "Click the record button ", /*#__PURE__*/react["createElement"](RecordToggle_RecordToggle, null), " to start recording."), /*#__PURE__*/react["createElement"]("div", {
    className: `${Profiler_default.a.Row} ${Profiler_default.a.LearnMoreRow}`
  }, "Click", ' ', /*#__PURE__*/react["createElement"]("a", {
    className: Profiler_default.a.LearnMoreLink,
    href: "https://fb.me/react-devtools-profiling",
    rel: "noopener noreferrer",
    target: "_blank"
  }, "here"), ' ', "to learn more about profiling."));
}
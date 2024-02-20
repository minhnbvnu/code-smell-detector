function ProgressIndicatorButton(props) {
  return h("div", {
    class: "uppy-Dashboard-Item-progress"
  }, h("button", {
    class: "uppy-u-reset uppy-Dashboard-Item-progressIndicator",
    type: "button",
    "aria-label": progressIndicatorTitle(props),
    title: progressIndicatorTitle(props),
    onclick: function onclick() {
      return onPauseResumeCancelRetry(props);
    }
  }, props.children));
}
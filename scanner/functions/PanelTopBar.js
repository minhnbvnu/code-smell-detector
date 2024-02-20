function PanelTopBar(props) {
  var allowNewUpload = props.allowNewUpload; // TODO maybe this should be done in ../index.js, then just pass that down as `allowNewUpload`

  if (allowNewUpload && props.maxNumberOfFiles) {
    allowNewUpload = props.totalFileCount < props.maxNumberOfFiles;
  }

  return h("div", {
    class: "uppy-DashboardContent-bar"
  }, !props.isAllComplete && !props.hideCancelButton ? h("button", {
    class: "uppy-DashboardContent-back",
    type: "button",
    onclick: props.cancelAll
  }, props.i18n('cancel')) : h("div", null), h("div", {
    class: "uppy-DashboardContent-title",
    role: "heading",
    "aria-level": "1"
  }, h(UploadStatus, props)), allowNewUpload ? h("button", {
    class: "uppy-DashboardContent-addMore",
    type: "button",
    "aria-label": props.i18n('addMoreFiles'),
    title: props.i18n('addMoreFiles'),
    onclick: function onclick() {
      return props.toggleAddFilesPanel(true);
    }
  }, h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    class: "uppy-c-icon",
    width: "15",
    height: "15",
    viewBox: "0 0 15 15"
  }, h("path", {
    d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
  })), h("span", {
    class: "uppy-DashboardContent-addMoreCaption"
  }, props.i18n('addMore'))) : h("div", null));
}
function init_options(options) {
  if (isBlank(options.view)) {
    options.view = new lazy.AskSendErrorView(options.ui || lazy.UI);
  }

  return [options.view, options.tracker || lazy.tracker];
}
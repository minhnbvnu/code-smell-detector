function Informer(uppy, opts) {
    var _this;

    _this = _Plugin.call(this, uppy, opts) || this;

    _this.render = function (state) {
      var _state$info = state.info,
          isHidden = _state$info.isHidden,
          message = _state$info.message,
          details = _state$info.details;

      function displayErrorAlert() {
        var errorMessage = message + " \n\n " + details;
        alert(errorMessage);
      }

      var handleMouseOver = function handleMouseOver() {
        clearTimeout(_this.uppy.infoTimeoutID);
      };

      var handleMouseLeave = function handleMouseLeave() {
        _this.uppy.infoTimeoutID = setTimeout(_this.uppy.hideInfo, 2000);
      };

      return h("div", {
        class: "uppy uppy-Informer",
        "aria-hidden": isHidden
      }, h("p", {
        role: "alert"
      }, message, ' ', details && h("span", {
        "aria-label": details,
        "data-microtip-position": "top-left",
        "data-microtip-size": "medium",
        role: "tooltip",
        onclick: displayErrorAlert,
        onMouseOver: handleMouseOver,
        onMouseLeave: handleMouseLeave
      }, "?")));
    };

    _this.type = 'progressindicator';
    _this.id = _this.opts.id || 'Informer';
    _this.title = 'Informer'; // set default options

    var defaultOptions = {}; // merge default options with the ones set by user

    _this.opts = _extends({}, defaultOptions, opts);
    return _this;
  }
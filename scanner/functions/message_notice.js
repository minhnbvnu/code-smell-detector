function message_notice(args) {
  var duration = args.duration !== undefined ? args.duration : defaultDuration;
  var iconType = {
    info: 'info-circle',
    success: 'check-circle',
    error: 'close-circle',
    warning: 'exclamation-circle',
    loading: 'loading'
  }[args.type];
  var target = args.key || message_key++;
  var closePromise = new Promise(function (resolve) {
    var callback = function callback() {
      if (typeof args.onClose === 'function') {
        args.onClose();
      }
      return resolve(true);
    };
    getMessageInstance(function (instance) {
      var iconNode = /*#__PURE__*/external_window_React_["createElement"](es_icon, {
        type: iconType,
        theme: iconType === 'loading' ? 'outlined' : 'filled'
      });
      var switchIconNode = iconType ? iconNode : '';
      instance.notice({
        key: target,
        duration: duration,
        style: {},
        content: /*#__PURE__*/external_window_React_["createElement"]("div", {
          className: "".concat(message_prefixCls, "-custom-content").concat(args.type ? " ".concat(message_prefixCls, "-").concat(args.type) : '')
        }, args.icon ? args.icon : switchIconNode, /*#__PURE__*/external_window_React_["createElement"]("span", null, args.content)),
        onClose: callback
      });
    });
  });
  var result = function result() {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
  result.then = function (filled, rejected) {
    return closePromise.then(filled, rejected);
  };
  result.promise = closePromise;
  return result;
}
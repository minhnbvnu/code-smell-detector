function renderError(error) {
  if (error === true) {
    return null;
  }

  if (true) {
    return Object(__WEBPACK_IMPORTED_MODULE_5_react__["createElement"])('pre', {
      style: {
        border: '1px solid #ffa39e',
        backgroundColor: '#fff1f0',
        padding: '8px 15px'
      }
    }, "".concat(error.message, ": ").concat(error.stack));
  } else {
    reportError(error);
  }

  return '<Error>';
}
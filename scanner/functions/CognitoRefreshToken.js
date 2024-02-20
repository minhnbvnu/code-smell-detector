function CognitoRefreshToken() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        RefreshToken = _ref.RefreshToken;

    _classCallCheck(this, CognitoRefreshToken);

    // Assign object
    this.token = RefreshToken || '';
  }
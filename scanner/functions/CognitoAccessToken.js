function CognitoAccessToken() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        AccessToken = _ref.AccessToken;

    _classCallCheck(this, CognitoAccessToken);

    return _possibleConstructorReturn(this, _CognitoJwtToken.call(this, AccessToken || ''));
  }
function CognitoIdToken() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        IdToken = _ref.IdToken;

    _classCallCheck(this, CognitoIdToken);

    return _possibleConstructorReturn(this, _CognitoJwtToken.call(this, IdToken || ''));
  }
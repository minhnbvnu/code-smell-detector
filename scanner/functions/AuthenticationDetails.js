function AuthenticationDetails(data) {
    _classCallCheck(this, AuthenticationDetails);

    var _ref = data || {},
        ValidationData = _ref.ValidationData,
        Username = _ref.Username,
        Password = _ref.Password,
        AuthParameters = _ref.AuthParameters;

    this.validationData = ValidationData || [];
    this.authParameters = AuthParameters || [];
    this.username = Username;
    this.password = Password;
  }
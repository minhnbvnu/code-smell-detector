function CognitoJwtToken(token) {
    _classCallCheck(this, CognitoJwtToken);

    // Assign object
    this.jwtToken = token || '';
    this.payload = this.decodePayload();
  }
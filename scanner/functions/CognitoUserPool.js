function CognitoUserPool(data) {
    _classCallCheck(this, CognitoUserPool);

    var _ref = data || {},
        UserPoolId = _ref.UserPoolId,
        ClientId = _ref.ClientId,
        endpoint = _ref.endpoint,
        AdvancedSecurityDataCollectionFlag = _ref.AdvancedSecurityDataCollectionFlag;

    if (!UserPoolId || !ClientId) {
      throw new Error('Both UserPoolId and ClientId are required.');
    }
    if (!/^[\w-]+_.+$/.test(UserPoolId)) {
      throw new Error('Invalid UserPoolId format.');
    }
    var region = UserPoolId.split('_')[0];

    this.userPoolId = UserPoolId;
    this.clientId = ClientId;

    this.client = new _cognitoidentityserviceprovider2.default({
      apiVersion: '2016-04-19',
      region: region,
      endpoint: endpoint
    });

    /**
     * By default, AdvancedSecurityDataCollectionFlag is set to true,
     * if no input value is provided.
     */
    this.advancedSecurityDataCollectionFlag = AdvancedSecurityDataCollectionFlag !== false;

    this.storage = data.Storage || new _StorageHelper2.default().getStorage();
  }
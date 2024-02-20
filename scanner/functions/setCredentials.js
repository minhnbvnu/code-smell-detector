function setCredentials () {
  const preferredRole = jwtDecode(store.idToken)['cognito:preferred_role']
  const params = {
    IdentityPoolId: cognitoIdentityPoolId,
    Logins: {
      [`cognito-idp.${cognitoRegion}.amazonaws.com/${cognitoUserPoolId}`]: store.idToken
    }
  }

  if (preferredRole) params.RoleArn = preferredRole

  AWS.config.credentials = new AWS.CognitoIdentityCredentials(params)

  return new Promise((resolve, reject) => {
    AWS.config.credentials.refresh(error => {
      if (error) {
        console.error(error)
        return reject(error)
      }

      initApiGatewayClient(AWS.config.credentials)
      store.user = { email: jwtDecode(store.idToken).email }
      updateAllUserData()

      return apiGatewayClient()
        .then(apiGatewayClient => apiGatewayClient.post('/signin', {}, {}, {}))
    })
  })
}
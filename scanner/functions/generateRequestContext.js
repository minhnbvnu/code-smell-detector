function generateRequestContext () {
  return {
    apiGateway: {
      event: {
        requestContext: {
          identity: {
            cognitoIdentityId: 'qwertyuiop',
            cognitoAuthenticationProvider: 'cognito-idp.us-west-2.amazonaws.com/us-west-2_qwertyuio,cognito-idp.us-west-2.amazonaws.com/us-west-2_asdfghjkl:CognitoSignIn:a1b2c3d4-a1b2-c3d4-e5f6-a1b2c3d4e5f6'
          }
        }
      }
    }
  }
}
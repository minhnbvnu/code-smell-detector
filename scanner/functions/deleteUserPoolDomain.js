async function deleteUserPoolDomain (cognitoIdentityServiceProvider, domain) {
  var response = await cognitoIdentityServiceProvider.describeUserPoolDomain({
    Domain: domain
  }).promise()

  if (response.DomainDescription.Domain) {
    await cognitoIdentityServiceProvider.deleteUserPoolDomain({
      UserPoolId: response.DomainDescription.UserPoolId,
      Domain: domain
    }).promise()
  }
}
function getPreconnectReply(securityPolicies) {
  return {
    return_value: {
      redirect_host: TEST_DOMAIN,
      security_policies: securityPolicies
    }
  }
}
function clientCredentialsFlow(scopes, tokenUrl, OAuthSchemeKey) {
    var params = {
      'client_id': clientId,
      'client_secret': clientSecret,
      'scope': scopes.join(' '),
      'grant_type': 'client_credentials'
    }
    $.ajax(
    {
      url : tokenUrl,
      type: "POST",
      data: params,
      success:function(data, textStatus, jqXHR)
      {
        onOAuthComplete(data,OAuthSchemeKey);
      },
      error: function(jqXHR, textStatus, errorThrown)
      {
        onOAuthComplete("");
      }
    });
    
  }
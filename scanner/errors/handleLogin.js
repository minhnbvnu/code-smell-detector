  popupDialog.find('button.api-popup-authbtn').click(function() {
    popupMask.hide();
    popupDialog.hide();

    var authSchemes = window.swaggerUi.api.authSchemes;
    var host = window.location;
    var pathname = location.pathname.substring(0, location.pathname.lastIndexOf("/"));
    var defaultRedirectUrl = host.protocol + '//' + host.host + pathname + '/o2c.html';
    var redirectUrl = window.oAuthRedirectUrl || defaultRedirectUrl;
    var url = null;
    var scopes = []
    var o = popup.find('input:checked'); 
    var OAuthSchemeKeys = [];
    var state;
    for(k =0; k < o.length; k++) {
      var scope = $(o[k]).attr('scope');
      if (scopes.indexOf(scope) === -1)
        scopes.push(scope);
      var OAuthSchemeKey = $(o[k]).attr('oauthtype');      
      if (OAuthSchemeKeys.indexOf(OAuthSchemeKey) === -1)
          OAuthSchemeKeys.push(OAuthSchemeKey);
    }
    
    //TODO: merge not replace if scheme is different from any existing 
    //(needs to be aware of schemes to do so correctly)
    window.enabledScopes=scopes;    
    
    for (var key in authSchemes) { 
      if (authSchemes.hasOwnProperty(key) && OAuthSchemeKeys.indexOf(key) != -1) { //only look at keys that match this scope.
        var flow = authSchemes[key].flow;

        if(authSchemes[key].type === 'oauth2' && flow && (flow === 'implicit' || flow === 'accessCode')) {
          var dets = authSchemes[key];
          url = dets.authorizationUrl + '?response_type=' + (flow === 'implicit' ? 'token' : 'code');
          window.swaggerUi.tokenName = dets.tokenName || 'access_token';
          window.swaggerUi.tokenUrl = (flow === 'accessCode' ? dets.tokenUrl : null);
          state = key;
        }
        else if(authSchemes[key].type === 'oauth2' && flow && (flow === 'application')) {
            var dets = authSchemes[key];
            window.swaggerUi.tokenName = dets.tokenName || 'access_token';
            clientCredentialsFlow(scopes, dets.tokenUrl, key);
            return;
        }        
        else if(authSchemes[key].grantTypes) {
          // 1.2 support
          var o = authSchemes[key].grantTypes;
          for(var t in o) {
            if(o.hasOwnProperty(t) && t === 'implicit') {
              var dets = o[t];
              var ep = dets.loginEndpoint.url;
              url = dets.loginEndpoint.url + '?response_type=token';
              window.swaggerUi.tokenName = dets.tokenName;
            }
            else if (o.hasOwnProperty(t) && t === 'accessCode') {
              var dets = o[t];
              var ep = dets.tokenRequestEndpoint.url;
              url = dets.tokenRequestEndpoint.url + '?response_type=code';
              window.swaggerUi.tokenName = dets.tokenName;
            }
          }
        }
      }
    }

    redirect_uri = redirectUrl;

    url += '&redirect_uri=' + encodeURIComponent(redirectUrl);
    url += '&realm=' + encodeURIComponent(realm);
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scopes.join(scopeSeparator));
    url += '&state=' + encodeURIComponent(state);
    for (var key in additionalQueryStringParams) {
        url += '&' + key + '=' + encodeURIComponent(additionalQueryStringParams[key]);
    }

    window.open(url);
  });
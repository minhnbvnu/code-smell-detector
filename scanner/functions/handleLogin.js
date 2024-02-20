function handleLogin() {
  var scopes = [];

  var auths = window.swaggerUi.api.authSchemes || window.swaggerUi.api.securityDefinitions;
  if(auths) {
    var key;
    var defs = auths;
    for(key in defs) {
      var auth = defs[key];
      if(auth.type === 'oauth2' && auth.scopes) {
        var scope;
        if(Array.isArray(auth.scopes)) {
          // 1.2 support
          var i;
          for(i = 0; i < auth.scopes.length; i++) {
            scopes.push(auth.scopes[i]);
          }
        }
        else {
          // 2.0 support
          for(scope in auth.scopes) {
            scopes.push({scope: scope, description: auth.scopes[scope], OAuthSchemeKey: key});
          }
        }
      }
    }
  }

  if(window.swaggerUi.api
    && window.swaggerUi.api.info) {
    appName = window.swaggerUi.api.info.title;
  }

  $('.api-popup-dialog').remove(); 
  popupDialog = $(
    [
      '<div class="api-popup-dialog">',
      '<div class="api-popup-title">Select OAuth2.0 Scopes</div>',
      '<div class="api-popup-content">',
        '<p>Scopes are used to grant an application different levels of access to data on behalf of the end user. Each API may declare one or more scopes.',
          '<a href="#">Learn how to use</a>',
        '</p>',
        '<p><strong>' + appName + '</strong> API requires the following scopes. Select which ones you want to grant to Swagger UI.</p>',
        '<ul class="api-popup-scopes">',
        '</ul>',
        '<p class="error-msg"></p>',
        '<div class="api-popup-actions"><button class="api-popup-authbtn api-button green" type="button">Authorize</button><button class="api-popup-cancel api-button gray" type="button">Cancel</button></div>',
      '</div>',
      '</div>'].join(''));
  $(document.body).append(popupDialog);

  //TODO: only display applicable scopes (will need to pass them into handleLogin)
  popup = popupDialog.find('ul.api-popup-scopes').empty();
  for (i = 0; i < scopes.length; i ++) {
    scope = scopes[i];
    str = '<li><input type="checkbox" id="scope_' + i + '" scope="' + scope.scope + '"' +'" oauthtype="' + scope.OAuthSchemeKey +'"/>' + '<label for="scope_' + i + '">' + scope.scope ;
    if (scope.description) {
      if ($.map(auths, function(n, i) { return i; }).length > 1) //if we have more than one scheme, display schemes
	    str += '<br/><span class="api-scope-desc">' + scope.description + ' ('+ scope.OAuthSchemeKey+')' +'</span>';
	  else
	    str += '<br/><span class="api-scope-desc">' + scope.description + '</span>';
    }
    str += '</label></li>';
    popup.append(str);
  }

  var $win = $(window),
    dw = $win.width(),
    dh = $win.height(),
    st = $win.scrollTop(),
    dlgWd = popupDialog.outerWidth(),
    dlgHt = popupDialog.outerHeight(),
    top = (dh -dlgHt)/2 + st,
    left = (dw - dlgWd)/2;

  popupDialog.css({
    top: (top < 0? 0 : top) + 'px',
    left: (left < 0? 0 : left) + 'px'
  });

  popupDialog.find('button.api-popup-cancel').click(function() {
    popupMask.hide();
    popupDialog.hide();
    popupDialog.empty();
    popupDialog = [];
  });

  $('button.api-popup-authbtn').unbind();
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

  popupMask.show();
  popupDialog.show();
  return;
}
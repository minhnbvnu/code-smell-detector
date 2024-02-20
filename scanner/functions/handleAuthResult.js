function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        // Access token has been successfully retrieved, requests can be sent to the API.
        gd.updateButton("Google Drive",true);
      } else {
        // No access token could be retrieved, show the button to start the authorization flow.
        document.getElementById('x-gd-sign').onclick = function() {
            gapi.auth.authorize(
                {'client_id': gd.CLIENT_ID, 'scope': gd.SCOPES, 'immediate': false},
                gd.handleAuthResult);
        };
      }
      
    }
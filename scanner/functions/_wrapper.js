function _wrapper(client) {
      var protocol = options.protocol;
      if (protocol === 'wss') {
         var url;
         //
         // If the access id and secret key are available, prepare the URL.
         // Otherwise, set the url to an invalid value.
         //
         if (awsAccessId === '' || awsSecretKey === '') {
            url = 'wss://no-credentials-available';
         } else {
            url = prepareWebSocketUrl(options, awsAccessId, awsSecretKey, awsSTSToken);
         }

         if (options.debug === true) {
            console.log('using websockets, will connect to \'' + url + '\'...');
         }

         options.url = url;
      } else if (protocol === 'wss-custom-auth') {
         options.url = prepareWebSocketCustomAuthUrl(options);
         if (options.debug === true) {
            console.log('using websockets custom auth, will connect to \'' + options.url + '\'...');
         }
         // Treat the request as a standard websocket request from here onwards
         protocol = 'wss';
      }
      return protocols[protocol](client, options);
   }
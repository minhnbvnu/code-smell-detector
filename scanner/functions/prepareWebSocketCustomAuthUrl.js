function prepareWebSocketCustomAuthUrl(options) {
   var path = '/mqtt';
   var hostName = options.host;

   // Include the port number in the hostname if it's not
   // the standard wss port (443).
   //
   if (!isUndefined(options.port) && options.port !== 443) {
      hostName = options.host + ':' + options.port;
   }

   return 'wss://' + hostName + path + (options.customAuthQueryString || '');
}
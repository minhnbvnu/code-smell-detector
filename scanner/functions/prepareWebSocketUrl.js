function prepareWebSocketUrl(options, awsAccessId, awsSecretKey, awsSTSToken) {
   var now = getDateTimeString();
   var today = getDateString(now);
   var path = '/mqtt';
   var awsServiceName = 'iotdevicegateway';
   var queryParams = 'X-Amz-Algorithm=AWS4-HMAC-SHA256' +
      '&X-Amz-Credential=' + awsAccessId + '%2F' + today + '%2F' + options.region + '%2F' + awsServiceName + '%2Faws4_request' +
      '&X-Amz-Date=' + now +
      '&X-Amz-SignedHeaders=host';
   var hostName = options.host;

   // Include the port number in the hostname if it's not
   // the standard wss port (443).
   //
   if (!isUndefined(options.port) && options.port !== 443) {
      hostName = options.host + ':' + options.port;
   }
   return signUrl('GET', 'wss://', hostName, path, queryParams,
      awsAccessId, awsSecretKey, options.region, awsServiceName, '', today, now, options.debug, awsSTSToken);
}
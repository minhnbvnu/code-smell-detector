function signUrl(method, scheme, hostname, path, queryParams, accessId, secretKey,
   region, serviceName, payload, today, now, debug, awsSTSToken) {

   var signedHeaders = 'host';

   var canonicalHeaders = 'host:' + hostname.toLowerCase() + '\n';

   var canonicalRequest = method + '\n' + // method
      path + '\n' + // path
      queryParams + '\n' + // query params
      canonicalHeaders + // headers
      '\n' + // required
      signedHeaders + '\n' + // signed header list
      sha256(payload, {
         asBytes: true
      }); // hash of payload (empty string)

   if (debug === true) {
      console.log('canonical request: ' + canonicalRequest + '\n');
   }

   var hashedCanonicalRequest = sha256(canonicalRequest, {
      asBytes: true
   });

   if (debug === true) {
      console.log('hashed canonical request: ' + hashedCanonicalRequest + '\n');
   }

   var stringToSign = 'AWS4-HMAC-SHA256\n' +
      now + '\n' +
      today + '/' + region + '/' + serviceName + '/aws4_request\n' +
      hashedCanonicalRequest;

   if (debug === true) {
      console.log('string to sign: ' + stringToSign + '\n');
   }

   var signingKey = getSignatureKey(secretKey, today, region, serviceName);

   if (debug === true) {
      console.log('signing key: ' + signingKey + '\n');
   }

   var signature = hmacSHA256(stringToSign, signingKey, {
      asBytes: true
   });

   if (debug === true) {
      console.log('signature: ' + signature + '\n');
   }

   var finalParams = queryParams + '&X-Amz-Signature=' + signature;

   if (!isUndefined(awsSTSToken)) {
      finalParams += '&X-Amz-Security-Token=' + encodeURIComponent(awsSTSToken);
   }

   var url = scheme + hostname + path + '?' + finalParams;

   if (debug === true) {
      console.log('url: ' + url + '\n');
   }

   return url;
}
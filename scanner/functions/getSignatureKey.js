function getSignatureKey(key, dateStamp, regionName, serviceName) {
   var kDate = hmacSHA256(dateStamp, 'AWS4' + key, {
      asBytes: true
   });
   var kRegion = hmacSHA256(regionName, kDate, {
      asBytes: true
   });
   var kService = hmacSHA256(serviceName, kRegion, {
      asBytes: true
   });
   var kSigning = hmacSHA256('aws4_request', kService, {
      asBytes: true
   });
   return kSigning;
}
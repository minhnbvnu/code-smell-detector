function monitorQuery(client, that) {
  aspect.before(client, 'query', function(target, methodName, methodArgs, probeData) {
    var method = 'query';
    that.metricsProbeStart(probeData, target, method, methodArgs);
    that.requestProbeStart(probeData, target, method, methodArgs);
    if (aspect.findCallbackArg(methodArgs) != undefined) {
      aspect.aroundCallback(methodArgs, probeData, function(target, args, probeData) {
        // Here, the query has executed and returned it's callback. Then
        // stop monitoring

        // Call the transaction link with a name and the callback for strong trace
        var callbackPosition = aspect.findCallbackArg(methodArgs);
        if (typeof callbackPosition != 'undefined') {
          aspect.strongTraceTransactionLink('pg: ', method, methodArgs[callbackPosition]);
        }

        that.metricsProbeEnd(probeData, method, methodArgs);
        that.requestProbeEnd(probeData, method, methodArgs);
      });
    }
  });
}
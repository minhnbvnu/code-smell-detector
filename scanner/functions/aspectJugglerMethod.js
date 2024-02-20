function aspectJugglerMethod(target, methods, probe) {
  aspect.before(target, methods, function(target, methodName, methodArgs, probeData) {
    probe.metricsProbeStart(probeData, target, methodName, methodArgs);
    probe.requestProbeStart(probeData, target, methodName, methodArgs);
    if (aspect.findCallbackArg(methodArgs) != undefined) {
      aspect.aroundCallback(methodArgs, probeData, function(target, args, probeData) {
        // Call the transaction link with a name and the callback for strong trace
        var callbackPosition = aspect.findCallbackArg(methodArgs);
        if (typeof callbackPosition != 'undefined') {
          aspect.strongTraceTransactionLink('loopback-datasource-juggler: ', methodName, methodArgs[callbackPosition]);
        }

        probe.metricsProbeEnd(probeData, methodName, methodArgs);
        probe.requestProbeEnd(probeData, methodName, methodArgs);
      });
    }
  });
}
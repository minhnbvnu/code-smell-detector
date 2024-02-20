function aspectLvldownMethod(dbTarget, methods, probe) {
  aspect.before(dbTarget, methods, function(dbTarget, methodName, methodArgs, probeData) {
    probe.metricsProbeStart(probeData, dbTarget, methodName, methodArgs);
    probe.requestProbeStart(probeData, dbTarget, methodName, methodArgs);
    if (aspect.findCallbackArg(methodArgs) != undefined) {
      aspect.aroundCallback(methodArgs, probeData, function(dbTarget, args, probeData) {
        // Call the transaction link with a name and the callback for strong trace
        var callbackPosition = aspect.findCallbackArg(methodArgs);
        if (typeof callbackPosition != 'undefined') {
          aspect.strongTraceTransactionLink('leveldown: ', methodName, methodArgs[callbackPosition]);
        }

        probe.metricsProbeEnd(probeData, methodName, methodArgs);
        probe.requestProbeEnd(probeData, methodName, methodArgs);
      });
    }
  });
}
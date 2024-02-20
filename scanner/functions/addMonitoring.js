function addMonitoring(connection, probe) {
  aspect.around(
    connection,
    'execute',
    function(target, methodName, args, probeData) {
      // Start the monitoring for the 'execute' method
      probe.metricsProbeStart(probeData, methodName, args);
      probe.requestProbeStart(probeData, methodName, args);
      // Advise the callback for 'execute'. Will do nothing if no callback is registered
      aspect.aroundCallback(args, probeData, function(target, callbackArgs, probeData) {
        // 'execute' has completed and the callback has been called, so end the monitoring
        // Call the transaction link with a name and the callback for strong trace
        var callbackPosition = aspect.findCallbackArg(args);
        if (typeof callbackPosition != 'undefined') {
          aspect.strongTraceTransactionLink('strong-oracle: ', methodName, args[callbackPosition]);
        }

        probe.metricsProbeEnd(probeData, methodName, args);
        probe.requestProbeEnd(probeData, methodName, args);
      });
    },
    function(target, methodName, args, probeData, rc) {
      // If no callback used then end the monitoring after returning from the 'execute' method instead
      if (aspect.findCallbackArg(args) == undefined) {
        probe.metricsProbeEnd(probeData, methodName, args);
        probe.requestProbeEnd(probeData, methodName, args);
      }
      return rc;
    }
  );
}
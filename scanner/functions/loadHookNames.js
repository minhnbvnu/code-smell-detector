function loadHookNames(element, hooksTree, loadHookNamesFunction, fetchFileWithCaching) {
  let record = hookNamesCache_map.get(element);

  if (__DEBUG__) {
    console.groupCollapsed('loadHookNames() record:');
    console.log(record);
    console.groupEnd();
  }

  if (!record) {
    const callbacks = new Set();
    const wakeable = {
      then(callback) {
        callbacks.add(callback);
      },

      // Optional property used by Timeline:
      displayName: `Loading hook names for ${element.displayName || 'Unknown'}`
    };
    let timeoutID;
    let didTimeout = false;
    let status = 'unknown';
    let resolvedHookNames = null;

    const wake = () => {
      if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = null;
      } // This assumes they won't throw.


      callbacks.forEach(callback => callback());
      callbacks.clear();
    };

    const handleLoadComplete = durationMs => {
      var _resolvedHookNames$si, _resolvedHookNames;

      // Log duration for parsing hook names
      logEvent({
        event_name: 'load-hook-names',
        event_status: status,
        duration_ms: durationMs,
        inspected_element_display_name: element.displayName,
        inspected_element_number_of_hooks: (_resolvedHookNames$si = (_resolvedHookNames = resolvedHookNames) === null || _resolvedHookNames === void 0 ? void 0 : _resolvedHookNames.size) !== null && _resolvedHookNames$si !== void 0 ? _resolvedHookNames$si : null
      });
    };

    const newRecord = record = {
      status: Pending,
      value: wakeable
    };
    withCallbackPerfMeasurements('loadHookNames', done => {
      loadHookNamesFunction(hooksTree, fetchFileWithCaching).then(function onSuccess(hookNames) {
        if (didTimeout) {
          return;
        }

        if (__DEBUG__) {
          console.log('[hookNamesCache] onSuccess() hookNames:', hookNames);
        }

        if (hookNames) {
          const resolvedRecord = newRecord;
          resolvedRecord.status = Resolved;
          resolvedRecord.value = hookNames;
        } else {
          const notFoundRecord = newRecord;
          notFoundRecord.status = Rejected;
          notFoundRecord.value = null;
        }

        status = 'success';
        resolvedHookNames = hookNames;
        done();
        wake();
      }, function onError(error) {
        if (didTimeout) {
          return;
        }

        if (__DEBUG__) {
          console.log('[hookNamesCache] onError()');
        }

        console.error(error);
        const thrownRecord = newRecord;
        thrownRecord.status = Rejected;
        thrownRecord.value = null;
        status = 'error';
        done();
        wake();
      }); // Eventually timeout and stop trying to load names.

      timeoutID = setTimeout(function onTimeout() {
        if (__DEBUG__) {
          console.log('[hookNamesCache] onTimeout()');
        }

        timeoutID = null;
        didTimeout = true;
        const timedoutRecord = newRecord;
        timedoutRecord.status = Rejected;
        timedoutRecord.value = null;
        status = 'timeout';
        done();
        wake();
      }, TIMEOUT);
    }, handleLoadComplete);
    hookNamesCache_map.set(element, record);
  }

  const response = readRecord(record).value;
  return response;
}
function deviceConnect() {
      thingShadows.register(thingName, {
            ignoreDeltas: true
         },
         function(err, failedTopics) {
            if (isUndefined(err) && isUndefined(failedTopics)) {
               console.log('Device thing registered.');
               genericOperation('update', generateRandomState());
            }
         });
   }
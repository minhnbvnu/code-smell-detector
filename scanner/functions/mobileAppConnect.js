function mobileAppConnect() {
      thingShadows.register(thingName, {
            ignoreDeltas: false
         },
         function(err, failedTopics) {
            if (isUndefined(err) && isUndefined(failedTopics)) {
               console.log('Mobile thing registered.');
            }
         });
   }
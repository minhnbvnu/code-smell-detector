function thingUpdaterConnect() {
      //
      // This process updates the thing shadow and subscribes to the non-thing
      // topic.
      //
      thingShadows.register(thingName, {
         ignoreDeltas: true
      }, function(err, failedTopics){
            if (isUndefined(err) && isUndefined(failedTopics)) {
               genericOperation('update', generateState());
               thingShadows.subscribe(nonThingName);
            }
         });
   }
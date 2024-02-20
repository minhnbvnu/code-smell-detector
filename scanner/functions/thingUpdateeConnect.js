function thingUpdateeConnect() {
      //
      // This process receives deltas from the thing shadow and publishes the
      // data to the non-thing topic.
      //
      thingShadows.register(thingName, {
         ignoreDeltas: false
      });
   }
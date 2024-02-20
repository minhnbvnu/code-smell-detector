function handleDelta(thingName, stateObject) {
      if (args.testMode === 2) {
         console.log('unexpected delta in device mode: ' + thingName);
      } else {
         console.log('received delta on ' + thingName +
            ', publishing on non-thing topic...');
         thingShadows.publish(nonThingName,
            JSON.stringify({
               message: 'received ' +
                  JSON.stringify(stateObject.state)
            }));
      }
   }
function handleStatus(thingName, stat, clientToken, stateObject) {
      var expectedClientToken = stack.pop();

      if (expectedClientToken === clientToken) {
         console.log('got \'' + stat + '\' status on: ' + thingName);
      } else {
         console.log('(status) client token mismtach on: ' + thingName);
      }

      if (args.testMode === 2) {
         console.log('updated state to thing shadow');
         //
         // If no other operation is pending, restart it after 10 seconds.
         //
         if (currentTimeout === null) {
            currentTimeout = setTimeout(function() {
               currentTimeout = null;
               genericOperation('update', generateState());
            }, 10000);
         }
      }
   }
function genericOperation(operation, state) {
      var clientToken = thingShadows[operation](thingName, state);
      if (clientToken === null) {
         //
         // The thing shadow operation can't be performed because another one
         // is pending; if no other operation is pending, reschedule it after an 
         // interval which is greater than the thing shadow operation timeout.
         //
         if (currentTimeout !== null) {
            console.log('operation in progress, scheduling retry...');
            currentTimeout = setTimeout(
               function() {
                  genericOperation(operation, state);
               },
               operationTimeout * 2);
         }
      } else {
         //
         // Save the client token so that we know when the operation completes.
         //
         stack.push(clientToken);
      }
   }
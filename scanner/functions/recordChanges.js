function recordChanges(key, currentValue, previousValue) {
        if (isFunction(destination.$onChanges) && currentValue !== previousValue) {
          // If we have not already scheduled the top level onChangesQueue handler then do so now
          if (!onChangesQueue) {
            scope.$$postDigest(flushOnChangesQueue);
            onChangesQueue = [];
          }
          // If we have not already queued a trigger of onChanges for this controller then do so now
          if (!changes) {
            changes = {};
            onChangesQueue.push(triggerOnChangesHook);
          }
          // If the has been a change on this property already then we need to reuse the previous value
          if (changes[key]) {
            previousValue = changes[key].previousValue;
          }
          // Store this change
          changes[key] = {previousValue: previousValue, currentValue: currentValue};
        }
      }
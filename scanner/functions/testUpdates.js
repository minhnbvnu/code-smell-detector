function testUpdates(components, desiredWillUpdates, desiredDidUpdates) {
      let i;

      ReactDOM.unstable_batchedUpdates(function() {
        for (i = 0; i < components.length; i++) {
          triggerUpdate(components[i]);
        }
      });

      expectUpdates(desiredWillUpdates, desiredDidUpdates);

      // Try them in reverse order

      ReactDOM.unstable_batchedUpdates(function() {
        for (i = components.length - 1; i >= 0; i--) {
          triggerUpdate(components[i]);
        }
      });

      expectUpdates(desiredWillUpdates, desiredDidUpdates);
    }
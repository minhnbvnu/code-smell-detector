function decrementListenerCount(current, count, name) {
      do {
        current.$$listenerCount[name] -= count;

        if (current.$$listenerCount[name] === 0) {
          delete current.$$listenerCount[name];
        }
      } while ((current = current.$parent));
    }
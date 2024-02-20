function incrementWatchersCount(current, count) {
      do {
        current.$$watchersCount += count;
      } while ((current = current.$parent));
    }
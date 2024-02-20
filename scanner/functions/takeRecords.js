function takeRecords() {
      if (observer && observer.takeRecords().length) {
        updateDirection();
      }
    }
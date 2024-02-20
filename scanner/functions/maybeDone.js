function maybeDone(result, payload) {
      counter += 1;
      e.emit(result, payload);

      if (counter === checks.length) {
        e.emit('done');
      }
    }
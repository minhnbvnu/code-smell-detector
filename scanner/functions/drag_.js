function drag_(e) {
        if (options.onDragEvent && options.onDragEvent(instance, addStop(e))) return;
        e_stop(e);
      }
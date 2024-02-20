function dirWrapper(object) {
          if (typeof dir === "function") {
            dir.call(this, object);
          }
          hit(source);
        }
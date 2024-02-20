function startNext(next) {
        subscription = next.subscribe({
          next(v) { observer.next(v) },
          error(e) { observer.error(e) },
          complete() {
            if (index === sources.length) {
              subscription = undefined;
              observer.complete();
            } else {
              startNext(C.from(sources[index++]));
            }
          },
        });
      }
function finishRevival(e) {
            if (c) return e;
            if (i.throwOnBadSyncType) throw new TypeError("Async method requested but sync result obtained");
            return Promise.resolve(e);
          }
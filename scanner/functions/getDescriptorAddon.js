function getDescriptorAddon() {
        return {
          isAbortingSuspended: false,
          isolateCallback(cb) {
            this.isAbortingSuspended = true;
            try {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              var result = cb(...args);
              this.isAbortingSuspended = false;
              return result;
            } catch (_unused) {
              var rid = randomId();
              this.isAbortingSuspended = false;
              throw new ReferenceError(rid);
            }
          }
        };
      }
function ensureHelper() {
        try {
          var result;
          var value = obj[prop];
          if (typeof value === 'function') {
            result = value.apply(obj, args);
          } else {
            result = value;
          }
          resolve(result);
        } catch(e) {
          if (!(e instanceof MissingDataException)) {
            reject(e);
            return;
          }
          pdfManager.streamManager.requestRange(e.begin, e.end, ensureHelper);
        }
      }
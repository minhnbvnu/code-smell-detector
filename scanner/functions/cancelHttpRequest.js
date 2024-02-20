function cancelHttpRequest() {
        if (httpCanceller) {
          httpCanceller.resolve();
        }
      }
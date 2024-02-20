function AmazonApstag(source) {
      var apstagWrapper = {
        fetchBids(a, b) {
          if (typeof b === 'function') {
            b([]);
          }
        },
        init: noopFunc,
        setDisplayBids: noopFunc,
        targetingKeys: noopFunc
      };
      window.apstag = apstagWrapper;
      hit(source);
    }
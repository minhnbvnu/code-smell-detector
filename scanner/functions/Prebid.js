function Prebid(source) {
      var pushFunction = function pushFunction(arg) {
        if (typeof arg === 'function') {
          try {
            arg.call();
          } catch (ex) {
            /* empty */
          }
        }
      };
      var pbjsWrapper = {
        addAdUnits() {},
        adServers: {
          dfp: {
            // https://docs.prebid.org/dev-docs/publisher-api-reference/adServers.dfp.buildVideoUrl.html
            // returns ad URL
            buildVideoUrl: noopStr
          }
        },
        adUnits: [],
        aliasBidder() {},
        cmd: [],
        enableAnalytics() {},
        getHighestCpmBids: noopArray,
        libLoaded: true,
        que: [],
        requestBids(arg) {
          if (arg instanceof Object && arg.bidsBackHandler) {
            try {
              arg.bidsBackHandler.call(); // https://docs.prebid.org/dev-docs/publisher-api-reference/requestBids.html
            } catch (ex) {
              /* empty */
            }
          }
        },
        removeAdUnit() {},
        setBidderConfig() {},
        setConfig() {},
        setTargetingForGPTAsync() {}
      };
      pbjsWrapper.cmd.push = pushFunction;
      pbjsWrapper.que.push = pushFunction;
      window.pbjs = pbjsWrapper;
      hit(source);
    }
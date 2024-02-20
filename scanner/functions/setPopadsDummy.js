function setPopadsDummy(source) {
        delete window.PopAds;
        delete window.popns;
        Object.defineProperties(window, {
          PopAds: {
            get: function get() {
              hit(source);
              return {};
            }
          },
          popns: {
            get: function get() {
              hit(source);
              return {};
            }
          }
        });
      }
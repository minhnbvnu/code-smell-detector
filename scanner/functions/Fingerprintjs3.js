function Fingerprintjs3(source) {
      var visitorId = function () {
        var id = '';
        for (var i = 0; i < 8; i += 1) {
          id += (Math.random() * 0x10000 + 0x1000).toString(16).slice(-4);
        }
        return id;
      }();
      var FingerprintJS = function FingerprintJS() {};
      FingerprintJS.prototype = {
        load() {
          return Promise.resolve(new FingerprintJS());
        },
        get() {
          return Promise.resolve({
            visitorId
          });
        },
        hashComponents: noopStr
      };
      window.FingerprintJS = new FingerprintJS();
      hit(source);
    }
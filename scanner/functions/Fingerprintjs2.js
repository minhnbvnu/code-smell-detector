function Fingerprintjs2(source) {
      var browserId = '';
      for (var i = 0; i < 8; i += 1) {
        browserId += (Math.random() * 0x10000 + 0x1000).toString(16).slice(-4);
      }
      var Fingerprint2 = function Fingerprint2() {};
      Fingerprint2.get = function (options, callback) {
        if (!callback) {
          callback = options;
        }
        setTimeout(function () {
          if (callback) {
            callback(browserId, []);
          }
        }, 1);
      };
      Fingerprint2.prototype = {
        get: Fingerprint2.get
      };
      window.Fingerprint2 = Fingerprint2;
      hit(source);
    }
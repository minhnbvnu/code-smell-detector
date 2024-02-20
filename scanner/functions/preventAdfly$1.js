function preventAdfly$1(source) {
      var isDigit = function isDigit(data) {
        return /^\d$/.test(data);
      };
      var handler = function handler(encodedURL) {
        var evenChars = '';
        var oddChars = '';
        for (var i = 0; i < encodedURL.length; i += 1) {
          if (i % 2 === 0) {
            evenChars += encodedURL.charAt(i);
          } else {
            oddChars = encodedURL.charAt(i) + oddChars;
          }
        }
        var data = (evenChars + oddChars).split('');
        for (var _i = 0; _i < data.length; _i += 1) {
          if (isDigit(data[_i])) {
            for (var ii = _i + 1; ii < data.length; ii += 1) {
              if (isDigit(data[ii])) {
                // eslint-disable-next-line no-bitwise
                var temp = parseInt(data[_i], 10) ^ parseInt(data[ii], 10);
                if (temp < 10) {
                  data[_i] = temp.toString();
                }
                _i = ii;
                break;
              }
            }
          }
        }
        data = data.join('');
        var decodedURL = window.atob(data).slice(16, -16);
        if (window.stop) {
          window.stop();
        }
        window.onbeforeunload = null;
        window.location.href = decodedURL;
      };
      var val;
      // Do not apply handler more than one time
      var applyHandler = true;
      var result = setPropertyAccess(window, 'ysmm', {
        configurable: false,
        set: function set(value) {
          if (applyHandler) {
            applyHandler = false;
            try {
              if (typeof value === 'string') {
                handler(value);
              }
            } catch (err) {} // eslint-disable-line no-empty
          }

          val = value;
        },
        get: function get() {
          return val;
        }
      });
      if (result) {
        hit(source);
      } else {
        logMessage(source, 'Failed to set up prevent-adfly scriptlet');
      }
    }
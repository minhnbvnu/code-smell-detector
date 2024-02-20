function nowebrtc$1(source) {
      var propertyName = '';
      if (window.RTCPeerConnection) {
        propertyName = 'RTCPeerConnection';
      } else if (window.webkitRTCPeerConnection) {
        propertyName = 'webkitRTCPeerConnection';
      }
      if (propertyName === '') {
        return;
      }
      var rtcReplacement = function rtcReplacement(config) {
        // eslint-disable-next-line max-len
        var message = "Document tried to create an RTCPeerConnection: ".concat(convertRtcConfigToString(config));
        logMessage(source, message);
        hit(source);
      };
      rtcReplacement.prototype = {
        close: noopFunc,
        createDataChannel: noopFunc,
        createOffer: noopFunc,
        setRemoteDescription: noopFunc
      };
      var rtc = window[propertyName];
      window[propertyName] = rtcReplacement;
      if (rtc.prototype) {
        rtc.prototype.createDataChannel = function (a, b) {
          return {
            close: noopFunc,
            send: noopFunc
          };
        }.bind(null);
      }
    }
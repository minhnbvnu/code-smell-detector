function convertRtcConfigToString(config) {
        var UNDEF_STR = "undefined";
        var str = UNDEF_STR;
        if (config === null) {
          str = "null";
        } else if (config instanceof Object) {
          var SERVERS_PROP_NAME = "iceServers";
          var URLS_PROP_NAME = "urls";
          if (Object.prototype.hasOwnProperty.call(config, SERVERS_PROP_NAME) && config[SERVERS_PROP_NAME] && Object.prototype.hasOwnProperty.call(config[SERVERS_PROP_NAME][0], URLS_PROP_NAME) && !!config[SERVERS_PROP_NAME][0][URLS_PROP_NAME]) {
            str = config[SERVERS_PROP_NAME][0][URLS_PROP_NAME].toString();
          }
        }
        return str;
      }
function getZmsMultiPortSupport(forceReload) {
        var d = $q.defer();
        if (configParams.ZM_MIN_STREAMING_PORT == -1 || forceReload) {
          debug("Checking value of ZM_MIN_STREAMING_PORT for the first time");
          var apiurl = loginData.apiurl;
          var myurl = apiurl + '/configs/viewByName/ZM_MIN_STREAMING_PORT.json?' + $rootScope.authSession;
          cache_or_http(myurl,'cached_multi_port', false, 3600*24)
            .then(function (data) {
                data = data.data;
                //console.log ("GOT " + JSON.stringify(data));

                if (data.config && data.config.Value) {
                  configParams.ZM_MIN_STREAMING_PORT = data.config.Value;
                  setCurrentServerMultiPortSupported(true);
                  debug("Got min streaming port value of: " + configParams.ZM_MIN_STREAMING_PORT);
                } else {
                  setCurrentServerMultiPortSupported(false);
                  debug("ZM_MIN_STREAMING_PORT not configured, disabling");
                  configParams.ZM_MIN_STREAMING_PORT = 0;
                }

                d.resolve(configParams.ZM_MIN_STREAMING_PORT);
                return (d.promise);
              },
              function (err) {
                configParams.ZM_MIN_STREAMING_PORT = 0;
                log("ZM_MIN_STREAMING_PORT not supported");
                setCurrentServerMultiPortSupported(false);
                d.resolve(configParams.ZM_MIN_STREAMING_PORT);
                return (d.promise);
              });
        } else {
          log("sending stored ZM_MIN_STREAMING_PORT " +
            configParams.ZM_MIN_STREAMING_PORT);
          d.resolve(configParams.ZM_MIN_STREAMING_PORT);
          return (d.promise);
        }
        return (d.promise);
      }
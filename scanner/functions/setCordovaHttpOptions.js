function setCordovaHttpOptions() {
        /*debug ("Cordova HTTP: Setting JSON serializer");
        cordova.plugin.http.setDataSerializer('utf8');*/
        if (loginData.isUseBasicAuth) {
          debug("Cordova HTTP: configuring basic auth");
          cordova.plugin.http.useBasicAuth(loginData.basicAuthUser, loginData.basicAuthPassword);
        }
        var cid = loginData.zmNinjaCustomId.replace('%APPVER%',zmAppVersion);
        debug("Setting cordova header X-ZmNinja to "+cid);
        // setup custom header
        cordova.plugin.http.setHeader('*', 'X-ZmNinja', cid);

        if (!loginData.enableStrictSSL) {
          //alert("Enabling insecure SSL");
          log(">>>> Disabling strict SSL checking (turn off  in Dev Options if you can't connect)");
          cordova.plugin.http.setServerTrustMode('nocheck', function () {
            debug('--> SSL is permissive, will allow any certs. Use at your own risk.');
          }, function () {
            NVR.log('-->Error setting SSL permissive');
          });

          if ($rootScope.platformOS == 'android') {
            log(">>> Android: enabling inline image view for self signed certs");
            cordova.plugins.certificates.trustUnsecureCerts(true);
          }
        } else {
          log(">>>> Enabling strict SSL checking (turn off  in Dev Options if you can't connect)");
        }
      }
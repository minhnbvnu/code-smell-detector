function debug(val) {
        if (loginData.enableDebug && loginData.enableLogs) {
          if (val !== undefined) {
            var regex1 = /"password":".*?"/g;
            var regex2 = /&pass=.*?(?=["&]|$)/g;
            var regex3 = /&token=([^&]*)/g;
            var regex4 = /&auth=([^&]*)/g;

            //console.log ("VAL IS " + val);
            val = val.replace(regex1, "<password removed>");
            val = val.replace(regex2, "<password removed>");
            val = val.replace (regex3, "&token=<removed>");
            val = val.replace (regex4, "&auth=<removed>");
          }

          $ionicPlatform.ready(function () {
            $fileLogger.debug(val);
          });
          console.log(val);
        }
      }
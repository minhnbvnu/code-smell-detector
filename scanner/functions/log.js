function log(val, logtype) {
        if (loginData.enableLogs) {
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
          // make sure password is removed
          //"username":"zmninja","password":"xyz",
          //val = val.replace(/\"password:\",
          $ionicPlatform.ready(function () {
            $fileLogger.log(logtype, val);
          });
          // console.log (val);
        }
      }
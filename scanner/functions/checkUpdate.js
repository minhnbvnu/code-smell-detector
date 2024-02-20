function checkUpdate() {
        var lastdateString = NVR.getLastUpdateCheck();
        var lastdate;
        if (!lastdateString) {

          lastdate = moment().subtract(2, 'day');

        } else {
          lastdate = moment(lastdateString);
        }
        var timdiff = moment().diff(lastdate, 'hours');
        if (timdiff < 24) {
          NVR.log("Checked for update " + timdiff + " hours ago. Not checking again");

          return;
        }
        NVR.log("Checking for new version updates...");

        $http.get(zm.latestRelease)
          .then(function (success) {

            NVR.setLastUpdateCheck(moment().toISOString());
            // $localstorage.set("lastUpdateCheck", moment().toISOString());
            //console.log ("FULL STRING " + success.data.tag_name);

            // console.log ("^^^^^^^^^^^^^ GOT: " + JSON.stringify(success));

            var res = success.data.tag_name.match("v(.*)");
            zmUpdateVersion = res[1];
            var currentVersion = NVR.getAppVersion();
            if ($rootScope.platformOS == "desktop") {
              zmUpdateVersion = zmUpdateVersion + "D";
            }
            //if (NVR.getAppVersion() != zmUpdateVersion) {
            if (NVR.versionCompare(NVR.getAppVersion(), zmUpdateVersion) == -1) {
              $rootScope.newVersionAvailable = "v" + zmUpdateVersion + " available";
            } else {
              $rootScope.newVersionAvailable = "";
            }
            NVR.debug("current version: " + currentVersion + " & available version " + zmUpdateVersion);
            //console.log ("Version compare returned: " + NVR.versionCompare(currentVersion, //zmUpdateVersion));
            // console.log ("Version compare returned: " + NVR.versionCompare(zmUpdateVersion, currentVersion));
            //console.log ("UPDATE " + zmVersion);
          });

     

      }
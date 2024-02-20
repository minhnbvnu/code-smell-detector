function _checkInitSanity(loginData) {
        // old version hacks for new variables

        // always true Oct 27 2016
        loginData.persistMontageOrder = true;
        loginData.enableh264 = true;

        if (typeof loginData.isUseBasicAuth === 'undefined') {
          loginData.isUseBasicAuth = false;
          loginData.basicAuthUser = '';
          loginData.basicAuthPassword = '';
          $rootScope.basicAuthHeader = '';
          $rootScope.basicAuthToken = '';
        }

        if (loginData.url.indexOf('@') != -1) {
          log(">> " + loginData.url);
          log(">>User/Password detected in URL, changing to new auth handling...");
          loginData.isUseBasicAuth = true;

          var components = URI.parse(loginData.url);
          loginData.url = components.scheme + "://" + components.host;
          if (components.port) loginData.url = loginData.url + ":" + components.port;
          if (components.path) loginData.url = loginData.url + components.path;

          components = URI.parse(loginData.streamingurl);
          loginData.streamingurl = components.scheme + "://" + components.host;
          if (components.port) loginData.streamingurl = loginData.streamingurl + ":" + components.port;
          if (components.path) loginData.streamingurl = loginData.streamingurl + components.path;

          components = URI.parse(loginData.apiurl);
          loginData.apiurl = components.scheme + "://" + components.host;
          if (components.port) loginData.apiurl = loginData.apiurl + ":" + components.port;
          if (components.path) loginData.apiurl = loginData.apiurl + components.path;

          $rootScope.basicAuthToken = btoa(components.userinfo);
          $rootScope.basicAuthHeader = 'Basic ' + $rootScope.basicAuthToken;
          //console.log (">>>> SET BASIC AUTH TO  " + $rootScope.basicAuthHeader);

          var up = components.userinfo.split(':');
          loginData.basicAuthPassword = up[1];
          loginData.basicAuthUser = up[0];
          //console.log ("SETTING "+loginData.basicAuthUser+" "+loginData.basicAuthPassword);

        }

        if (loginData.isUseBasicAuth) {
          $rootScope.basicAuthToken = btoa(loginData.basicAuthUser + ':' + loginData.basicAuthPassword);
          $rootScope.basicAuthHeader = 'Basic ' + $rootScope.basicAuthToken;
          debug("Basic authentication detected, constructing Authorization Header");
        }

        if (typeof loginData.enableAlarmCount === 'undefined') {
          debug("enableAlarmCount does not exist, setting to true");
          loginData.enableAlarmCount = true;
        }

        if (typeof loginData.onTapScreen == 'undefined') {
          loginData.onTapScreen = $translate.instant('kTapMontage');
        }

        if (loginData.onTapScreen != $translate.instant('kTapMontage') &&
          loginData.onTapScreen != $translate.instant('kTapEvents') &&
          loginData.onTapScreen != $translate.instant('kTapLiveMonitor')) {
          log("Invalid onTap setting found, resetting. I got " + loginData.onTapScreen);
          loginData.onTapScreen = $translate.instant('kMontage');
        }

        if (typeof loginData.minAlarmCount === 'undefined') {
          debug("minAlarmCount does not exist, setting to true");
          loginData.minAlarmCount = 1;
        }

        if (typeof loginData.montageSize == 'undefined') {
          debug("montageSize does not exist, setting to 2 (2 per col)");
          loginData.montageSize = 2;
        }

        if (typeof loginData.useNphZms == 'undefined') {
          debug("useNphZms does not exist. Setting to true");
          loginData.useNphZms = true;
        }

        if (typeof loginData.useNphZmsForEvents == 'undefined') {
          debug("useNphZmsForEvents does not exist. Setting to true");
          loginData.useNphZmsForEvents = true;
        }

        if (typeof loginData.forceImageModePath == 'undefined') {
          debug("forceImageModePath does not exist. Setting to false");
          loginData.forceImageModePath = false;
        }

        if (typeof loginData.reachability == 'undefined') {
          debug("reachability does not exist. Setting to true");
          loginData.reachability = true;
        }


        // force it - this may not be the problem
        loginData.reachability = true;

        // and now, force enable it
        loginData.useNphZms = true;
        loginData.useNphZmsForEvents = true;

        if (typeof loginData.packMontage == 'undefined') {
          debug("packMontage does not exist. Setting to false");
          loginData.packMontage = false;
        }

        if (typeof loginData.forceNetworkStop == 'undefined') {
          debug("forceNetwork does not exist. Setting to false");
          loginData.forceNetworkStop = false;
        }

        if (typeof loginData.enableLogs == 'undefined') {
          debug("enableLogs does not exist. Setting to true");
          loginData.enableLogs = true;
        }

        if (typeof loginData.defaultPushSound == 'undefined') {
          debug("defaultPushSound does not exist. Setting to false");
          loginData.defaultPushSound = false;
        }

        //console.log("INIT SIMUL=" + loginData.disableSimulStreaming);
        //console.log("INIT PLATFORM IS=" + $rootScope.platformOS);
        if (typeof loginData.disableSimulStreaming == 'undefined') {
          loginData.disableSimulStreaming = false;
          //console.log("INIT DISABLING SIMUL:" + loginData.disableSimulStreaming);
        }

        if (typeof loginData.exitOnSleep == 'undefined') {
          debug("exitOnSleep does not exist. Setting to false");
          loginData.exitOnSleep = false;
        }

        if (typeof loginData.enableBlog == 'undefined') {
          debug("enableBlog does not exist. Setting to true");
          loginData.enableBlog = true;
        }

        if (typeof loginData.packeryPositionsArray == 'undefined') {
          debug("packeryPositionsArray does not exist. Setting to empty");
          loginData.packeryPositionsArray = {};
        }

        if (typeof loginData.packeryPositions == 'undefined') {
          debug("packeryPositions does not exist. Setting to empty");
          loginData.packeryPositions = "";
        }

        if (typeof loginData.use24hr == 'undefined') {
          //debug("use24hr does not exist. Setting to false");
          loginData.use24hr = false;
        }

        if (typeof timelineModalGraphType == 'undefined') {
          //debug("timeline graph type not set. Setting to all");
          loginData.timelineModalGraphType = $translate.instant('kGraphAll');
          //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + loginData.timelineModalGraphType);
        }

        if (typeof loginData.resumeDelay == 'undefined') {
          //debug("resumeDelay does not exist. Setting to 0");
          loginData.resumeDelay = 0;
        }
        // override resumeDelay - it was developed on a wrong assumption
        loginData.resumeDelay = 0;

        if (typeof loginData.montageHistoryQuality == 'undefined') {
          debug("montageHistoryQuality does not exist. Setting to 50");
          loginData.montageHistoryQuality = "50";
        }

        if (typeof loginData.vibrateOnPush == 'undefined') {
          debug("vibrate on push not found, setting to true");
          loginData.vibrateOnPush = true;
        }

        if (typeof loginData.isFullScreen == 'undefined') {
          loginData.isFullScreen = false;
        }

        if (typeof loginData.reloadInMontage == 'undefined') {

          loginData.reloadInMontage = false;

        }

        if (typeof loginData.soundOnPush == 'undefined') {
          debug("sound on push not found, setting to true");
          loginData.soundOnPush = true;

        }

        if (typeof loginData.cycleMonitors == 'undefined') {

          loginData.cycleMonitors = false;

        }

        if (typeof loginData.cycleMonitorsInterval == 'undefined') {

          loginData.cycleMonitorsInterval = 10;

        }

        if (typeof loginData.cycleMontage == 'undefined') {

          loginData.cycleMontage = false;

        }

        if (typeof loginData.cycleMontageInterval == 'undefined') {

          loginData.cycleMontageInterval = 10;

        }

        if (typeof loginData.enableLowBandwidth == 'undefined') {

          loginData.enableLowBandwidth = false;

        }


        if (typeof loginData.autoSwitchBandwidth == 'undefined') {

          loginData.autoSwitchBandwidth = false;

        }

        $rootScope.runMode = getBandwidth();
        log("Setting NVR init bandwidth to: " + $rootScope.runMode);

        if (typeof loginData.refreshSecLowBW == 'undefined') {

          loginData.refreshSecLowBW = 8;

        }

        if (typeof loginData.singleliveFPS == 'undefined') {

          loginData.singleliveFPS = '';

        }

        if (typeof loginData.montageliveFPS == 'undefined') {

          loginData.montageLiveFPS = '';

        }

        if (typeof loginData.disableAlarmCheckMontage == 'undefined') {

          loginData.disableAlarmCheckMontage = false;

        }

        if (typeof loginData.useLocalTimeZone == 'undefined') {

          loginData.useLocalTimeZone = true;

        }

        if (typeof loginData.fastLogin == 'undefined') {

          loginData.fastLogin = true;

        }

        if (typeof loginData.currentMontageProfile == 'undefined') {

          loginData.currentMontageProfile = '';

        }

        if (typeof loginData.followTimeLine == 'undefined') {

          loginData.followTimeLine = false;

        }

        if (typeof loginData.timelineScale == 'undefined') {

          loginData.timelineScale = -1;

        }


        if (typeof loginData.showMontageSubMenu == 'undefined') {

          loginData.showMontageSubMenu = false;

        }



        if (typeof loginData.monSingleImageQuality == 'undefined') {

          loginData.monSingleImageQuality = 100;

        }

        if (typeof loginData.hideArchived == 'undefined') {

          loginData.hideArchived = false;

        }

        if (typeof loginData.videoPlaybackSpeed == 'undefined') {

          loginData.videoPlaybackSpeed = 1;

        }


        if (typeof loginData.eventViewThumbs == 'undefined') {

          loginData.eventViewThumbs = 'snapshot';

        }

        if (typeof loginData.eventViewThumbsSize == 'undefined') {

          loginData.eventViewThumbsSize = 'small';

        }

        if (typeof loginData.enableSlowLoading == 'undefined') {

          loginData.enableSlowLoading = false;

        }


        if (typeof loginData.enableStrictSSL == 'undefined') {

          loginData.enableStrictSSL = false;

        }

        if (typeof loginData.momentGridSize == 'undefined') {

          loginData.momentGridSize = 40;

        }

        if (typeof loginData.enableMomentSubMenu == 'undefined') {

          loginData.enableMomentSubMenu = true;

        }

        if (typeof loginData.momentShowIcons == 'undefined') {

          loginData.momentShowIcons = false;

        }


        if (typeof loginData.momentMonitorFilter == 'undefined') {

          loginData.momentMonitorFilter = JSON.stringify([]);

        }


        if (typeof loginData.momentArrangeBy == 'undefined') {

          loginData.momentArrangeBy = "StartTime";

        }

        if (typeof loginData.insertBasicAuthToken == 'undefined') {

          loginData.insertBasicAuthToken = false;

        }


        if (typeof loginData.showLiveForInProgressEvents == 'undefined') {

          loginData.showLiveForInProgressEvents = true;

        }


        if (typeof loginData.loginAPISupported == 'undefined') {

          loginData.loginAPISupported = false;

        }

        if (typeof loginData.montageResizeSteps == 'undefined') {

          loginData.montageResizeSteps = 0.2;

        }

        if (typeof loginData.saveToCloud == 'undefined') {

          loginData.saveToCloud = true;

        }



        if (typeof loginData.montageReviewCollapse == 'undefined') {

          loginData.montageReviewCollapse = true;

        }

        if (typeof loginData.objectDetectionFilter == 'undefined') {

          loginData.objectDetectionFilter = false;

        }

        if (typeof loginData.enableEventRefresh == 'undefined') {

          loginData.enableEventRefresh = true;

        }



        if (typeof loginData.lastEventCheckTimes == 'undefined') {
          loginData.lastEventCheckTimes = {};

        }


        if (typeof loginData.enableMontageOverlays == 'undefined') {
          loginData.enableMontageOverlays = true;

        }

        if (typeof loginData.showMontageSidebars == 'undefined') {
          loginData.showMontageSidebars = false;

        }

        if (typeof loginData.isTokenSupported == 'undefined') {
          loginData.isTokenSupported = false;

        }

        if (typeof loginData.accessTokenExpires == 'undefined') {
          loginData.accessTokenExpires = '';

        }

        if (typeof loginData.refreshTokenExpires == 'undefined') {
          loginData.refreshTokenExpires = '';

        }

        if (typeof loginData.refreshToken == 'undefined') {
          loginData.refreshToken = '';

        }

        if (typeof loginData.accessToken == 'undefined') {
          loginData.accessToken = '';

        }

        if (typeof loginData.isKiosk == 'undefined') {
          loginData.isKiosk = false;

        }
        if (typeof loginData.useAPICaching == 'undefined') {
          loginData.useAPICaching = true;

        }

        if (typeof loginData.pauseStreams == 'undefined') {
          loginData.pauseStreams = false;

        }

        if ((typeof loginData.zmNinjaCustomId == 'undefined') || (loginData.zmNinjaCustomId == '')) {
          loginData.zmNinjaCustomId = 'zmNinja_%APPVER%';
        }

        // Silly error to hardcode the version when I released
        // 1.3.x. Let's fix it
        if (loginData.zmNinjaCustomId.indexOf('zmNinja_1.3')!=-1) {
          loginData.zmNinjaCustomId = 'zmNinja_%APPVER%';
        }

        if (typeof loginData.obfuscationScheme == 'undefined')  {
          loginData.obfuscationScheme = 'lzs';
        }

        if (typeof loginData.showAnimation == 'undefined')  {
          loginData.showAnimation = true;
        }

        if (typeof loginData.montageHideFooter == 'undefined')  {
          loginData.montageHideFooter = false;
        }




        if (typeof loginData.httpCordovaNoEncode == 'undefined')  {
          loginData.httpCordovaNoEncode = false;
        }

        if (typeof loginData.currentZMGroupNames == 'undefined')  {
          loginData.currentZMGroupNames = [];
        }

        if (typeof loginData.unsupported == 'undefined')  {
          loginData.unsupported = {};
        }

        if (typeof loginData.monitorSpecific == 'undefined')  {
          loginData.monitorSpecific = {};
        }

        if (typeof loginData.currentZMState == 'undefined')  {
          loginData.currentZMState = 'unknown';
        }

        if (typeof loginData.retrieveFramesForEvents == 'undefined')  {
          loginData.retrieveFramesForEvents = true;
        }

        loginData.canSwipeMonitors = true;
        loginData.forceImageModePath = false;
        loginData.enableBlog = true;
        loginData.pauseStreams = true;
      }
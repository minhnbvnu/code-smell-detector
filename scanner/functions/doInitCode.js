function doInitCode()

  {

    $scope.isModalActive = false;

    $scope.hrsAgo = 4;
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);

    timeFormat = 'MM/DD/YYYY HH:mm:ss';
    curYear = new Date().getFullYear();
    readyToRun = false;

    frameoptions = [];
    // default = start of day
    timeto = moment();
    timefrom = moment().startOf('day');
    $scope.datetimeValueTo.value = timeto.toDate();
    $scope.sliderVal.rate = 1;
    $scope.sliderVal.realRate = $scope.sliderVal.rate * 100;

    $scope.datetimeValueFrom.value = timefrom.toDate();
    $scope.datetimeValueFrom.hrs = Math.round(moment.duration(moment().diff(moment($scope.datetimeValueFrom.value))).asHours());


    $scope.monitorSize = []; // array with montage sizes per monitor
    $scope.scaleDirection = []; // 1 = increase -1 = decrease
    // The difference between old and original is this:
    // old will have a copy of the last re-arranged monitor list
    // while original will have a copy of the order returned by ZM
    var oldMonitors = []; // To keep old order if user cancels after sort;
    // Montage display order may be different so don't
    // mangle monitors as it will affect other screens
    // in Montage screen we will work with this local copy
    //$scope.MontageMonitors = angular.copy ($scope.monitors);
    var montageOrder = []; // This array will keep the ordering in montage view
    var hiddenOrder = []; // 1 = hide, 0 = don't hide
    var tempMonitors = message;
    /* if (tempMonitors.length == 0)
        {
            $rootScope.zmPopup = $ionicPopup.alert(
            {
                title: $translate.instant('kNoMonitors'),
                template: $translate.instant('kPleaseCheckCredentials'),
                okText: $translate.instant('kButtonOk'),
                cancelText: $translate.instant('kButtonCancel'),
            });
            $ionicHistory.nextViewOptions(
            {
                disableBack: true
            });
            $state.go("app.login");
            return;
        }
*/
    NVR.log("Inside MontageHistoryCtrl:We found " + $scope.MontageMonitors.length + " monitors");
    // $scope.MontageMonitors = NVR.applyMontageMonitorPrefs(message, 1)[0];


    // --------------------------------------------------------
    // Handling of back button in case modal is open should
    // close the modal
    // --------------------------------------------------------                               
    $ionicPlatform.registerBackButtonAction(function (e) {
      e.preventDefault();
      if ($scope.modal && $scope.modal.isShown()) {
        // switch off awake, as liveview is finished
        NVR.debug("Modal is open, closing it");
        NVR.setAwake(false);
        $scope.modal.remove();
        $scope.isModalActive = false;
      } else {
        NVR.debug("Modal is closed, so toggling or exiting");
        if (!$ionicSideMenuDelegate.isOpenLeft()) {
          $ionicSideMenuDelegate.toggleLeft();
        } else {
          navigator.app.exitApp();
        }
      }
    }, 1000);
    $scope.isRefresh = $stateParams.isRefresh;
    sizeInProgress = false;
    $ionicSideMenuDelegate.canDragContent(false);
    $scope.LoginData = NVR.getLogin();
    $scope.monLimit = $scope.LoginData.maxMontage;
    $scope.currentLimit = $scope.LoginData.maxMontage;
    ld = NVR.getLogin();

    if (!isMultiPort || ld.disableSimulStreaming) {

      NVR.log("Limiting montage to 5, thanks to max connection  per domain limit");
      $scope.currentLimit = 5;
      $scope.monLimit = 5;
    } else {

      NVR.log("You have multiport on, so no montage limits");
    }



    $timeout(function () {
      // initPackery();
      readyToRun = true;
      NVR.debug("Calling footerCollapse from doInit");
      footerCollapse();
    }, zm.packeryTimer);


  }
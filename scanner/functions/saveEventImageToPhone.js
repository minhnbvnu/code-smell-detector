function saveEventImageToPhone(onlyAlarms, eid) {
    var curState = carouselUtils.getStop();
    carouselUtils.setStop(true);
    var url;

    //console.log("Your index is  " + $scope.mycarousel.index);
    //console.log("Associated image is " + $scope.slides[$scope.mycarousel.index].img);




    NVR.debug("EventModalCtrl: SaveEventImageToPhone called");
    var canvas, context, imageDataUrl, imageData;
    var loginData = NVR.getLogin();

    // for alarms only
    if (onlyAlarms)
      $scope.mycarousel.index = 1;

      url = $scope.playbackURL + '/index.php?view=image&rand=' + $rootScope.rand +
        "&eid=" + $scope.eventId +
        "&fid=" + $scope.slides[$scope.mycarousel.index - 1].id + $rootScope.authSession;



    if ($rootScope.basicAuthToken) {
      url += "&basicauth=" + $rootScope.basicAuthToken;

    }

    $scope.selectEventUrl = url;
    $scope.slideIndex = $scope.mycarousel.index;
    $scope.slideLastIndex = $scope.slides.length - 1;
    // console.log ("FRAMES LENGTH IS " +$scope.slideLastIndex );

    // console.log ("URL TO DISPLAY " + url);

    $rootScope.zmPopup = $ionicPopup.show({
      template: '<center>Frame: {{slideIndex+1}} / {{slideLastIndex+1}}</center><br/><img src="{{selectEventUrl}}" width="100%"  />',
      title: 'Select ' + (onlyAlarms ? 'Alarmed ' : '') + 'frame to save',
      subTitle: 'use left and right arrows to change',
      scope: $scope,
      cssClass: 'popup95',
      buttons: [{
          // left 1
          text: '',
          type: 'button-small button-energized ion-chevron-left',
          onTap: function (e) {
            if ($scope.slideIndex > 0) $scope.slideIndex--;


              $scope.selectEventUrl = $scope.playbackURL + '/index.php?view=image&rand=' + $rootScope.rand + "&eid=" + $scope.eventId + "&fid=" + $scope.slides[$scope.slideIndex].id+ $rootScope.authSession;


            if ($rootScope.basicAuthToken) {
              $scope.selectEventUrl += "&basicauth=" + $rootScope.basicAuthToken;

            }

            //NVR.log("selected frame is " + $scope.slideIndex);

            //console.log("URL TO DISPLAY " + $scope.slides[$scope.slideIndex].img);

            e.preventDefault();
          }
        },
        {
          // right 1
          text: '',
          type: 'button-small button-energized ion-chevron-right',
          onTap: function (e) {
            if ($scope.slideIndex < $scope.slideLastIndex) $scope.slideIndex++;


              $scope.selectEventUrl = $scope.playbackURL + '/index.php?view=image&rand=' + $rootScope.rand + "&eid=" + $scope.eventId + "&fid=" + $scope.slides[$scope.slideIndex].id+ $rootScope.authSession;


            if ($rootScope.basicAuthToken) {
              $scope.selectEventUrl += "&basicauth=" + $rootScope.basicAuthToken;

            }

            //NVR.log("selected frame is " + $scope.slideIndex);
            //console.log("URL TO DISPLAY " + $scope.slides[$scope.slideIndex].img);
            e.preventDefault();
          }
        },
        {
          // left 10
          text: '',
          type: 'button-small button-energized ion-skip-backward',
          onTap: function (e) {
            var tempVar = $scope.slideIndex;
            tempVar -= 10;
            if (tempVar < 0) tempVar = 0;
            $scope.slideIndex = tempVar;


              $scope.selectEventUrl = $scope.playbackURL + '/index.php?view=image&rand=' + $rootScope.rand + "&eid=" + $scope.eventId + "&fid=" + $scope.slides[$scope.slideIndex].id+ $rootScope.authSession;

            if ($rootScope.basicAuthToken) {
              $scope.selectEventUrl += "&basicauth=" + $rootScope.basicAuthToken;

            }
            //NVR.log("selected frame is " + $scope.slideIndex);

            e.preventDefault();
          }
        },
        {
          // right 10
          text: '',
          type: 'button-small button-energized ion-skip-forward',
          onTap: function (e) {
            var tempVar = $scope.slideIndex;
            tempVar += 10;
            if (tempVar > $scope.slideLastIndex) tempVar = $scope.slideLastIndex;
            $scope.slideIndex = tempVar;
            if ($scope.slideIndex < $scope.slideLastIndex) $scope.slideIndex++;


              $scope.selectEventUrl = $scope.playbackURL + '/index.php?view=image&rand=' + $rootScope.rand + "&eid=" + $scope.eventId + "&fid=" + $scope.slides[$scope.slideIndex].id+ $rootScope.authSession;


            if ($rootScope.basicAuthToken) {
              $scope.selectEventUrl += "&basicauth=" + $rootScope.basicAuthToken;

            }
            //NVR.log("selected frame is " + $scope.slideIndex);
            e.preventDefault();
          }
        },

        {
          text: '',
          type: 'button-assertive button-small ion-close-round'
        },
        {
          text: '',
          type: 'button-positive button-small ion-checkmark-round',
          onTap: function (e) {
            saveEvent("image",eid);

          }
        }
      ]
    });



  }
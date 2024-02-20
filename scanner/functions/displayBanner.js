function displayBanner(mytype, mytext, myinterval, mytimer) {

        var contentBannerInstance =
          $ionicContentBanner.show({
            text: mytext || 'no text',
            interval: myinterval || 2000,
            //autoClose: mytimer || 6000,
            type: mytype || 'info',
            transition: 'vertical',
            //cancelOnStateChange: false
          });

        $timeout(function () {
          contentBannerInstance();
        }, mytimer || 6000);
      }
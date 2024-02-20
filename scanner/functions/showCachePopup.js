function showCachePopup(str) {
      $rootScope.zmPopup = $ionicPopup.alert({
        template: str,
  
        title: $translate.instant('kNote'),
  
        buttons: [
          {
            text: $translate.instant('kButtonOk'),
          }
        ]
      });
  
      
    }
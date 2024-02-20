function switchThumbClass() {

      var ld = NVR.getLogin();
      if (ld.eventViewThumbs != 'none') {
        if (ld.eventViewThumbsSize == 'large') {
          NVR.debug ('Using big thumbs');
          $scope.thumbClass = 'large';
        } else if (ld.eventViewThumbsSize == 'small') {
          NVR.debug ('Using small thumbs ');
          $scope.thumbClass = 'small';
        } 
        else {
          NVR.debug ('using xsmall thumbs ');
          $scope.thumbClass = 'xsmall';
        }
      } else {
          NVR.debug ('No thumbs');
      }

    }
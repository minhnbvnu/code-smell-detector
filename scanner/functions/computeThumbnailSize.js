function computeThumbnailSize(mw, mh, mo) {
      // if ZM is going to rotate the view, lets flip our dimensions
      if (mo != 0 && mo != 180) {
        var tmp = mw;
        mw = mh;
        mh = tmp;
      }
      var ld = NVR.getLogin();
      var landscape = ($rootScope.devWidth > $rootScope.devHeight) ? true:false;
      var maxThumbHeight;
      var maxThumbWidth;

      if (ld.eventViewThumbsSize == 'large') {
        maxThumbHeight = monitorHeight ? monitorHeight : Math.min(0.7* $rootScope.devHeight, 450);
        maxThumbWidth = Math.min(0.95* $rootScope.devWidth, $rootScope.devWidth - 44);
        if (landscape) {
          // go till 90% of width in large landscape, but restricted to useable row height 
          return calculateAspectRatioFit(mw, mh, maxThumbWidth, maxThumbHeight);
        } else {
                    // go till 80% of width in large portrait, but restricted to useable row height 

          return calculateAspectRatioFit(mw, mh, maxThumbWidth, maxThumbHeight);
        }

      } else if (ld.eventViewThumbsSize == 'small') { // small
        maxThumbHeight = monitorHeight ? monitorHeight : 250;
        maxThumbWidth = 0.5* $rootScope.devWidth;
        if (landscape) {
          // go till 50% of width in small landscape, but restricted to useable row height 
          return calculateAspectRatioFit(mw, mh, maxThumbWidth, maxThumbHeight);
        } else {
                    // go till 30% of width in small portrait, but restricted to useable row height 
          return calculateAspectRatioFit(mw, mh, maxThumbWidth, maxThumbHeight);
        }

      } else { // xsmall
        maxThumbHeight = monitorHeight ? monitorHeight : 170;
        maxThumbWidth = 0.3* $rootScope.devWidth;
        if (landscape) {
          // go till 50% of width in small landscape, but restricted to useable row height 
          return calculateAspectRatioFit(mw, mh, maxThumbWidth, maxThumbHeight);
        } else {
                    // go till 30% of width in small portrait, but restricted to useable row height 
          return calculateAspectRatioFit(mw, mh, maxThumbWidth, maxThumbHeight);
        }

      }
     
    }
function getTextZoomCallback(tz) {
        $rootScope.textScaleFactor = parseFloat(tz + "%") / 100.0;
        NVR.debug("text zoom factor is " + $rootScope.textScaleFactor);
      }
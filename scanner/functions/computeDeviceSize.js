function computeDeviceSize() {
        var pixelRatio = window.devicePixelRatio || 1;
        $rootScope.pixelRatio = pixelRatio;
        $rootScope.devWidth = ((window.innerWidth > 0) ? window.innerWidth : screen.width);
        $rootScope.devHeight = ((window.innerHeight > 0) ? window.innerHeight : screen.height);

        $rootScope.devWidthIgnorePix = $rootScope.devWidth;
        $rootScope.devHeightIgnorePix = $rootScope.devHeight;

        //$rootScope.devWidth *= pixelRatio;
        //$rootScope.devHeight *= pixelRatio;
        $rootScope.videoHeight = $rootScope.devHeight - 20;
        debug("resize/orient: " + $rootScope.devWidth + "(w) * " + $rootScope.devHeight+"(h)");
      }
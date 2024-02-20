function timedPageReload() {

      if (!NVR.getLogin().enableEventRefresh) {
        NVR.debug ("Event refresh disabled");
        return;
      }
     
      if ($ionicScrollDelegate.$getByHandle("mainScroll").getScrollPosition().top !=0 ) {
        NVR.debug ("Not reloading as you have scrolled");

      } 
      else if ($scope.modal != undefined && $scope.modal.isShown()) {
          NVR.debug ("Not reloading as you have a modal open");
      }
      else if (scrubOngoing) {
          NVR.debug ("Not reloading, as video scrub is on");
      }
      else {
        doRefresh();
      }
      
    }
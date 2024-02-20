function navTitle() {
      var hnd = $ionicScrollDelegate.$getByHandle("mainScroll");
      if ( (!hnd) || (!hnd.getScrollPosition())) $scope.navTitle = "";
      var scrl = parseFloat(hnd.getScrollPosition().top);

      var item = 0;
      if (eventRowHeight)
        item = Math.floor(scrl / eventRowHeight);
      if ($scope.events[item])
        $scope.navTitle = ($scope.events[item].Event.humanizeTime);

      currEventNum = item;
      var eventHeightCounter = (currEventNum+1)*eventRowHeight;
      currEventPos = 1 - ((eventHeightCounter - scrl) / eventRowHeight);
      //console.log("item: " + item + " scrl: " + scrl + " " + currEventPos);

      $scope.$evalAsync();
      //return Math.random();
    }
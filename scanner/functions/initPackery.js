function initPackery() {
    areStreamsStopped = true;
    $ionicLoading.show({
      template: $translate.instant('kArrangingImages'),
      noBackdrop: true,
      duration: zm.loadingTimeout
    });
    var progressCalled = false;
    draggies = [];
    var layouttype = true;
    var ld = NVR.getLogin();

    var elem = angular.element(document.getElementById("mygrid"));
    pckry = new Packery('.grid', {
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer',
      gutter: 0,
      initLayout: true

    });
    //console.log ("**** mygrid is " + JSON.stringify(elem));
    imagesLoaded(elem).on('progress', function (instance, img) {
      var result = img.isLoaded ? 'loaded' : 'broken';
      // NVR.debug('~~loaded image is ' + result + ' for ' + img.img.src);
      $timeout(function () {
        pckry.layout();
      }, 100);

      progressCalled = true;
      // if (layouttype) $timeout (function(){layout(pckry);},100);
    });
    imagesLoaded(elem).once('always', function () {
      //console.log("******** ALL IMAGES LOADED");
      //$scope.$digest();
      areStreamsStopped = false;

      NVR.debug("All images loaded");
      $ionicLoading.hide();

      $scope.areImagesLoading = false;

      if (!progressCalled) {
        NVR.log("***  PROGRESS WAS NOT CALLED");
        //pckry.reloadItems();
      }

      $timeout(function () {

        pckry.getItemElements().forEach(function (itemElem) {
          draggie = new Draggabilly(itemElem);
          pckry.bindDraggabillyEvents(draggie);
          draggies.push(draggie);
          draggie.disable();
          draggie.unbindHandles();
        });

        pckry.on('dragItemPositioned', itemDragged);


        $timeout(function () {
          NVR.log("Force calling resize");
          pckry.layout();
          $scope.packeryDone = true;
        }, zm.packeryTimer); // don't ask

      }, zm.packeryTimer);

    });

    function itemDragged(item) {
      NVR.debug("drag complete");
    }
  }
function initMasonry() {


    /*$ionicLoading.show({
      template: $translate.instant('kArrangingImages'),
      noBackdrop: true,
      duration: zm.loadingTimeout
    });*/

    if (masonry) {
      masonry.destroy();
    }
    $scope.areImagesLoading = true;
    //var progressCalled = false;

    var ld = NVR.getLogin();

    var elem = angular.element(document.getElementById("mygrid"));
    masonry = new Masonry('.grid', {
      itemSelector: '.grid-item',
      horizontalOrder: true, // this keeps the order
      gutter: 0,
      initLayout: true,
      percentPosition: true,

    });


    imagesLoaded(elem).on('progress', function (instance, img) {
      $timeout (function() {masonry.layout();},100);
      
    });
    imagesLoaded(elem).once('always', function () {

      NVR.debug("All images loaded");
      $ionicLoading.hide();
      $scope.areImagesLoading = false;
      jiggleAway();

     /* if (!progressCalled) {
        NVR.log("***  PROGRESS WAS NOT CALLED");
        masonry.reloadItems();
        jiggleAway();
      }*/

    });

    imagesLoaded(elem).once('fail', function () {

      NVR.debug("Failure callback, all images did not load");
      $ionicLoading.hide();
      $scope.areImagesLoading = false;
      jiggleAway();

     /* if (!progressCalled) {
        NVR.log("***  PROGRESS WAS NOT CALLED");
        masonry.reloadItems();
        jiggleAway();
      }*/

    });
  }
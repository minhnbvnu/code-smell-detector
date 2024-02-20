function jiggleAway() {



    // STEP 3: Called when step 2 completes for the finale
    masonry.once('layoutComplete', function (laidOutItems) {
      $timeout(function () {
        masonry.layout();
      }, 10);
    });

    // STEP2: Trigger a layout to re-pack
    $timeout(function () {
      masonry.layout();
      // $ionicScrollDelegate.$getByHandle("moment-delegate").scrollTop();

    }, 300);
  }
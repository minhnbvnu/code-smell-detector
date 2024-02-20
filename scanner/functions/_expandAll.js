function _expandAll(arr) {

    NVR.debug("Expanding all images");
    for (var i = 0; i < arr.length; i++) {
      arr[i].Event.hide = false;
      arr[i].Event.icon = 'ion-code-working';
      arr[i].Event.collapseCount = '';
    }


    if (masonry) {
      $timeout(function () {
        masonry.reloadItems();
        jiggleAway();

      }, 100);
    }

  }
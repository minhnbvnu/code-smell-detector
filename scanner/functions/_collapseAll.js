function _collapseAll(arr) {

    NVR.debug("Collapsing all images");
    for (var i = 0; i < monitors.length; i++) {
      var firstFound = false;
      var firstIndex = -1;
      var collapseCount = 0;
      for (var j = 0; j < arr.length; j++) {
        if (arr[j].Event.MonitorId == monitors[i].Monitor.Id) {

          if (!firstFound) {
            firstIndex = j; // remember this to create a collapsecount
            arr[j].Event.hide = false;
            arr[j].Event.icon = 'ion-images';
            firstFound = true;
          } else if (!arr[j].Event.pinned) {
            // mid matches, but not first, and not pinned so collapse
            arr[j].Event.hide = true;
            arr[j].Event.icon = 'ion-code-working';
            collapseCount++;
          }
        } // if same mid
      } // moment for j
      if (firstIndex != -1) {
        if (collapseCount > 0) {
          arr[firstIndex].Event.collapseCount = collapseCount + 1;
        } else { // nothing to group
          arr[firstIndex].Event.icon = 'ion-code-working';
          arr[firstIndex].Event.collapseCount = "";
        }

      } // firstIndex
    } // monitor for i

    if (masonry) {

      $timeout(function () {
        masonry.reloadItems();
        jiggleAway();

      }, 100);
    }

  }
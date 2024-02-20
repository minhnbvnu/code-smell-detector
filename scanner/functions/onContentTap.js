function onContentTap(gestureEvt) {
          if (sideMenuCtrl.getOpenAmount() !== 0) {
            sideMenuCtrl.close();
            gestureEvt.gesture.srcEvent.preventDefault();
            startCoord = null;
            primaryScrollAxis = null;
          } else if (!startCoord) {
            startCoord = ionic.tap.pointerCoord(gestureEvt.gesture.srcEvent);
          }
        }
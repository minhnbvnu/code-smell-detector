function onDragX(e) {
          if (!sideMenuCtrl.isDraggableTarget(e)) return;

          if (getPrimaryScrollAxis(e) == 'x') {
            sideMenuCtrl._handleDrag(e);
            e.gesture.srcEvent.preventDefault();
          }
        }
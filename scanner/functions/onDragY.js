function onDragY(e) {
          if (getPrimaryScrollAxis(e) == 'x') {
            e.gesture.srcEvent.preventDefault();
          }
        }
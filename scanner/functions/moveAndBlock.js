function moveAndBlock(evt, handle, startRect, deltaX, deltaY) {
            evt.stopPropagation();
            evt.preventDefault();
            moveRect(activeHandle, startRect, deltaX, deltaY);
          }
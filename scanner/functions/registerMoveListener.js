function registerMoveListener({
    target,
    clientY,
    touch
  }) {
    const sliderNode = ref.current;
    const handleNode = handleRef.current;

    if (sliderNode == null || handleNode == null) {
      // I don't think this could ever happen in practice
      return null;
    }

    const sliderRect = sliderNode.getBoundingClientRect();
    const handleRect = handleNode.getBoundingClientRect();
    const {
      top: sliderTop,
      height: sliderHeight
    } = sliderRect;
    const {
      top: handleTop,
      height: realHandleHeight
    } = handleRect; // If the user clicks on the handle we want them to continue to hold onto
    // that point of te handle. If they click outside of the handle (in the
    // slider itself) we want to center the handle at that point and have them
    // move the handle from the center.

    const handleOffset = handleNode.contains(target) ? clientY - handleTop : realHandleHeight / 2;
    const baseOffset = sliderTop + handleOffset; // Measure the actual rect height rather than use the `height` prop, becuase
    // we might be in double-size mode.

    const spanSize = sliderHeight - realHandleHeight;

    function moveToPosition(y) {
      // Ensure dragging does not cause elements/text to be selected.
      // https://stackoverflow.com/a/19164149/1263117
      const startOffset = y - baseOffset;
      onChange(clamp(startOffset / spanSize, 0, 1));
    }

    if (touch) {
      const handleTouchMove = event => {
        if (event.cancelable) {
          event.preventDefault();
        }

        moveToPosition(event.touches[0].clientY);
      };

      const handleTouchEnd = () => {
        if (onAfterChange != null) {
          onAfterChange();
        }

        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false
      });
      document.addEventListener("touchend", handleTouchEnd);
    } else {
      const handleMouseMove = event => {
        event.preventDefault();
        moveToPosition(event.clientY);
      };

      const handleMouseUp = () => {
        if (onAfterChange != null) {
          onAfterChange();
        }

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    if (onBeforeChange != null) {
      onBeforeChange();
    } // Move the slider to where they've started.


    moveToPosition(clientY);
  }
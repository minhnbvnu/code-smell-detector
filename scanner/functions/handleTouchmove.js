function handleTouchmove(e) {
      e.touches = e.touches || [{
        screenX: e.screenX,
        screenY: e.screenY
      }];

      // Force mouse events to have had a down event first
      if (!startY && e.type == 'mousemove') {
        return;
      }

      // if multitouch or regular scroll event, get out immediately
      if (!canOverscroll || e.touches.length > 1) {
        return;
      }
      //if this is a new drag, keep track of where we start
      if (startY === null) {
        startY = e.touches[0].screenY;
      }

      deltaY = e.touches[0].screenY - startY;

      // how far have we dragged so far?
      // kitkat fix for touchcancel events http://updates.html5rocks.com/2014/05/A-More-Compatible-Smoother-Touch
      // Only do this if we're not on crosswalk
      if (ionic.Platform.isAndroid() && ionic.Platform.version() === 4.4 && !ionic.Platform.isCrosswalk() && scrollParent.scrollTop === 0 && deltaY > 0) {
        isDragging = true;
        e.preventDefault();
      }


      // if we've dragged up and back down in to native scroll territory
      if (deltaY - dragOffset <= 0 || scrollParent.scrollTop !== 0) {

        if (isOverscrolling) {
          isOverscrolling = false;
          setScrollLock(false);
        }

        if (isDragging) {
          nativescroll(scrollParent, deltaY - dragOffset * -1);
        }

        // if we're not at overscroll 0 yet, 0 out
        if (lastOverscroll !== 0) {
          overscroll(0);
        }
        return;

      } else if (deltaY > 0 && scrollParent.scrollTop === 0 && !isOverscrolling) {
        // starting overscroll, but drag started below scrollTop 0, so we need to offset the position
        dragOffset = deltaY;
      }

      // prevent native scroll events while overscrolling
      e.preventDefault();

      // if not overscrolling yet, initiate overscrolling
      if (!isOverscrolling) {
        isOverscrolling = true;
        setScrollLock(true);
      }

      isDragging = true;
      // overscroll according to the user's drag so far
      overscroll((deltaY - dragOffset) / 3);

      // update the icon accordingly
      if (!activated && lastOverscroll > ptrThreshold) {
        activated = true;
        ionic.requestAnimationFrame(activate);

      } else if (activated && lastOverscroll < ptrThreshold) {
        activated = false;
        ionic.requestAnimationFrame(deactivate);
      }
    }
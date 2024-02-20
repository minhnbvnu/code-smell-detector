function onScroll(e) {
      if (scroller.scrollTop) {
        scrollbar.scrollTop += scroller.scrollTop;
        scroller.scrollTop = 0;
      }
      if (lastScrollTop != scrollbar.scrollTop || lastScrollLeft != scroller.scrollLeft) {
        lastScrollTop = scrollbar.scrollTop;
        lastScrollLeft = scroller.scrollLeft;
        updateDisplay([]);
        if (options.fixedGutter) gutter.style.left = scroller.scrollLeft + "px";
        if (options.onScroll) options.onScroll(instance);
      }
    }
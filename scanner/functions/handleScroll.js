function handleScroll(e) {
      // canOverscrol is used to greatly simplify the drag handler during normal scrolling
      canOverscroll = (e.target.scrollTop === 0) || isDragging;
    }
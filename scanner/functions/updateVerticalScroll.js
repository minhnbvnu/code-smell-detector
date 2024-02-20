function updateVerticalScroll(scrollTop) {
      var th = textHeight(), virtualHeight = Math.floor(doc.height * th + 2 * paddingTop()), scrollbarHeight = scroller.clientHeight;
      scrollbar.style.height = scrollbarHeight + "px";
      if (scroller.clientHeight)
        scrollbarInner.style.height = virtualHeight + "px";
      // Position the mover div to align with the current virtual scroll position
      if (scrollTop != null) scrollbar.scrollTop = scrollTop;
      mover.style.top = (displayOffset * th - scrollbar.scrollTop) + "px";
      scrollbar.style.display = (virtualHeight > scrollbarHeight) ? "block" : "none";
    }
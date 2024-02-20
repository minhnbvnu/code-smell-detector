function scrollOffsetPercent(percent, scrollSource) {
      var viewHeight = scrollSource == document.scrollingElement ? window.innerHeight : scrollSource.clientHeight;
      return (scrollSource.scrollHeight - viewHeight) * percent;
    }
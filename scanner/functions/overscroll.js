function overscroll(val) {
      scrollChild.style[ionic.CSS.TRANSFORM] = 'translate3d(0px, ' + val + 'px, 0px)';
      lastOverscroll = val;
    }
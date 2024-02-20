function redactorToolbarSrcoll($toolbar, $container, toolbarFixedTopOffset) {
    let offsetTop = $container.offset().top,
      containerHeight = $container.outerHeight(),
      normallCSS = {
        position: "relative",
        top: "auto",
        width: "auto"
      },
      fixedCSS = {
        position: "fixed",
        top: toolbarFixedTopOffset,
        width: $container.width(),
        boxShadow: "none"
      };
    if (offsetTop < toolbarFixedTopOffset) {
      if (
        Math.abs(offsetTop) < Math.abs(containerHeight - toolbarFixedTopOffset)
      ) {
        $toolbar.css(fixedCSS);
        $container.css("padding-top", $toolbar.outerHeight());
      } else {
        $toolbar.css(normallCSS);
        $container.css("padding-top", 0);
      }
    } else {
      $toolbar.css(normallCSS);
      $container.css("padding-top", 0);
    }
  }
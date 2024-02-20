function positionView(target, popoverEle) {
    var targetEle = jqLite(target.target || target);
    var buttonOffset = $ionicPosition.offset(targetEle);
    var popoverWidth = popoverEle.prop('offsetWidth');
    var popoverHeight = popoverEle.prop('offsetHeight');
    // Use innerWidth and innerHeight, because clientWidth and clientHeight
    // doesn't work consistently for body on all platforms
    var bodyWidth = $window.innerWidth;
    var bodyHeight = $window.innerHeight;

    var popoverCSS = {
      left: buttonOffset.left + buttonOffset.width / 2 - popoverWidth / 2
    };
    var arrowEle = jqLite(popoverEle[0].querySelector('.popover-arrow'));

    if (popoverCSS.left < POPOVER_BODY_PADDING) {
      popoverCSS.left = POPOVER_BODY_PADDING;
    } else if (popoverCSS.left + popoverWidth + POPOVER_BODY_PADDING > bodyWidth) {
      popoverCSS.left = bodyWidth - popoverWidth - POPOVER_BODY_PADDING;
    }

    // If the popover when popped down stretches past bottom of screen,
    // make it pop up if there's room above
    if (buttonOffset.top + buttonOffset.height + popoverHeight > bodyHeight &&
        buttonOffset.top - popoverHeight > 0) {
      popoverCSS.top = buttonOffset.top - popoverHeight;
      popoverEle.addClass('popover-bottom');
    } else {
      popoverCSS.top = buttonOffset.top + buttonOffset.height;
      popoverEle.removeClass('popover-bottom');
    }

    arrowEle.css({
      left: buttonOffset.left + buttonOffset.width / 2 -
        arrowEle.prop('offsetWidth') / 2 - popoverCSS.left + 'px'
    });

    popoverEle.css({
      top: popoverCSS.top + 'px',
      left: popoverCSS.left + 'px',
      marginLeft: '0',
      opacity: '1'
    });

  }
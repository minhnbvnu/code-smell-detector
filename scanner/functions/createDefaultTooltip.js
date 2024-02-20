function createDefaultTooltip(target)
  {
    var options = {
        disableAnimation: extractOptionAttribute(target, 'data-tooltip-disable-animation', defaultOptions.disableAnimation),
        animateFunction: extractOptionAttribute(target, "data-tooltip-animate-function", defaultOptions.animateFunction),
        color: extractOptionAttribute(target, "data-tooltip-color", ''),
        contentMore: extractOptionAttribute(target, "data-tooltip-more", ''),
        contentText: extractOptionAttribute(target, "data-tooltip", ''),
        delay: extractOptionAttribute(target, "data-tooltip-delay", defaultOptions.delay),
        hideDelay: extractOptionAttribute(target, "data-tooltip-hide-delay", defaultOptions.delay),
        maxWidth: extractOptionAttribute(target, "data-tooltip-maxwidth", 'auto'),
        persistent: extractOptionAttribute(target, "data-tooltip-persistent", defaultOptions.persistent),
        stickTo: extractOptionAttribute(target, "data-tooltip-stickto", defaultOptions.stickTo)
    };

    createTooltip(target, options, DOMTooltips);
  }
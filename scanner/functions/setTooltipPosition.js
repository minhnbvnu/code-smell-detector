function setTooltipPosition(
  tooltip,
  trigger,
  placement,
  auto,
  appendTo,
  positionBy,
  viewport
) {
  if (!isElement(tooltip) || !isElement(trigger)) {
    return;
  }
  const isPopover =
    tooltip && tooltip.className && tooltip.className.indexOf('popover') >= 0;
  let containerScrollTop;
  let containerScrollLeft;
  if (!isExist(appendTo) || appendTo === 'body' || positionBy === 'body') {
    const doc = document.documentElement;
    containerScrollLeft =
      (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    containerScrollTop =
      (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  } else {
    const container = getElementBySelectorOrRef(positionBy || appendTo);
    containerScrollLeft = container.scrollLeft;
    containerScrollTop = container.scrollTop;
  }
  // auto adjust placement
  if (auto) {
    // Try: right -> bottom -> left -> top
    // Cause the default placement is top
    const placements = [
      PLACEMENTS.RIGHT,
      PLACEMENTS.BOTTOM,
      PLACEMENTS.LEFT,
      PLACEMENTS.TOP,
    ];
    // The class switch helper function
    const changePlacementClass = (placement) => {
      // console.log(placement)
      placements.forEach((placement) => {
        removeClass(tooltip, placement);
      });
      addClass(tooltip, placement);
    };
    // No need to adjust if the default placement fits
    if (!isAvailableAtPosition(trigger, tooltip, placement)) {
      for (let i = 0, l = placements.length; i < l; i++) {
        // Re-assign placement class
        changePlacementClass(placements[i]);
        // Break if new placement fits
        if (isAvailableAtPosition(trigger, tooltip, placements[i])) {
          placement = placements[i];
          break;
        }
      }
      changePlacementClass(placement);
    }
  }
  // fix left and top for tooltip
  const rect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  let top;
  let left;
  if (placement === PLACEMENTS.BOTTOM) {
    top = containerScrollTop + rect.top + rect.height;
    left =
      containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2;
  } else if (placement === PLACEMENTS.LEFT) {
    top =
      containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2;
    left = containerScrollLeft + rect.left - tooltipRect.width;
  } else if (placement === PLACEMENTS.RIGHT) {
    top =
      containerScrollTop + rect.top + rect.height / 2 - tooltipRect.height / 2;
    // https://github.com/uiv-lib/uiv/issues/272
    // add 1px to fix above issue
    left = containerScrollLeft + rect.left + rect.width + 1;
  } else {
    top = containerScrollTop + rect.top - tooltipRect.height;
    left =
      containerScrollLeft + rect.left + rect.width / 2 - tooltipRect.width / 2;
  }
  let viewportEl;
  // viewport option
  if (isString(viewport)) {
    viewportEl = document.querySelector(viewport);
  } else if (isFunction(viewport)) {
    viewportEl = viewport(trigger);
  }
  if (isElement(viewportEl)) {
    const popoverFix = isPopover ? 11 : 0;
    const viewportReact = viewportEl.getBoundingClientRect();
    const viewportTop = containerScrollTop + viewportReact.top;
    const viewportLeft = containerScrollLeft + viewportReact.left;
    const viewportBottom = viewportTop + viewportReact.height;
    const viewportRight = viewportLeft + viewportReact.width;
    // fix top
    if (top < viewportTop) {
      top = viewportTop;
    } else if (top + tooltipRect.height > viewportBottom) {
      top = viewportBottom - tooltipRect.height;
    }
    // fix left
    if (left < viewportLeft) {
      left = viewportLeft;
    } else if (left + tooltipRect.width > viewportRight) {
      left = viewportRight - tooltipRect.width;
    }
    // fix for popover pointer
    if (placement === PLACEMENTS.BOTTOM) {
      top -= popoverFix;
    } else if (placement === PLACEMENTS.LEFT) {
      left += popoverFix;
    } else if (placement === PLACEMENTS.RIGHT) {
      left -= popoverFix;
    } else {
      top += popoverFix;
    }
  }
  // set position finally
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
}
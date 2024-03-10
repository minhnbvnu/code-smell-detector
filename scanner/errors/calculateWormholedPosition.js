function calculateWormholedPosition(trigger, content, destination, { horizontalPosition, verticalPosition, matchTriggerWidth, previousHorizontalPosition, previousVerticalPosition }) {
  // Collect information about all the involved DOM elements
  let scroll = { left: window.pageXOffset, top: window.pageYOffset };
  let { left: triggerLeft, top: triggerTop, width: triggerWidth, height: triggerHeight } = trigger.getBoundingClientRect();
  let { height: dropdownHeight, width: dropdownWidth } = content.getBoundingClientRect();
  let viewportWidth = self.document.body.clientWidth || self.window.innerWidth;
  let style = {};

  // Apply containers' offset
  let anchorElement = destination.parentNode;
  let anchorPosition = window.getComputedStyle(anchorElement).position;
  while (anchorPosition !== 'relative' && anchorPosition !== 'absolute' && anchorElement.tagName.toUpperCase() !== 'BODY' && destination.parentNode) {
    anchorElement = anchorElement.parentNode;
    anchorPosition = window.getComputedStyle(anchorElement).position;
  }
  if (anchorPosition === 'relative' || anchorPosition === 'absolute') {
    let rect = anchorElement.getBoundingClientRect();
    triggerLeft = triggerLeft - rect.left;
    triggerTop = triggerTop - rect.top;
    let { offsetParent } = anchorElement;
    if (offsetParent) {
      triggerLeft -= anchorElement.offsetParent.scrollLeft;
      triggerTop -= anchorElement.offsetParent.scrollTop;
    }
  }

  // Calculate drop down width
  dropdownWidth = matchTriggerWidth ? triggerWidth : dropdownWidth;
  if (matchTriggerWidth) {
    style.width = dropdownWidth;
  }

  // Calculate horizontal position
  let triggerLeftWithScroll = triggerLeft + scroll.left;
  if (horizontalPosition === 'auto') {
    // Calculate the number of visible horizontal pixels if we were to place the
    // dropdown on the left and right
    let leftVisible = Math.min(viewportWidth, triggerLeft + dropdownWidth) - Math.max(0, triggerLeft);
    let rightVisible = Math.min(viewportWidth, triggerLeft + triggerWidth) - Math.max(0, triggerLeft + triggerWidth - dropdownWidth);

    if (dropdownWidth > leftVisible && rightVisible > leftVisible) {
      // If the drop down won't fit left-aligned, and there is more space on the
      // right than on the left, then force right-aligned
      horizontalPosition = 'right';
    } else if (dropdownWidth > rightVisible && leftVisible > rightVisible) {
      // If the drop down won't fit right-aligned, and there is more space on
      // the left than on the right, then force left-aligned
      horizontalPosition = 'left';
    } else {
      // Keep same position as previous
      horizontalPosition = previousHorizontalPosition || 'left';
    }
  }
  if (horizontalPosition === 'right') {
    style.right = viewportWidth - (triggerLeftWithScroll + triggerWidth);
  } else if (horizontalPosition === 'center') {
    style.left = triggerLeftWithScroll + (triggerWidth - dropdownWidth) / 2;
  } else {
    style.left = triggerLeftWithScroll;
  }

  // Calculate vertical position
  let triggerTopWithScroll = triggerTop + scroll.top;
  if (verticalPosition === 'above') {
    style.top = triggerTopWithScroll - dropdownHeight;
  } else if (verticalPosition === 'below') {
    style.top = triggerTopWithScroll + triggerHeight;
  } else {
    let viewportBottom = scroll.top + self.window.innerHeight;
    let enoughRoomBelow = triggerTopWithScroll + triggerHeight + dropdownHeight < viewportBottom;
    let enoughRoomAbove = triggerTop > dropdownHeight;

    if (previousVerticalPosition === 'below' && !enoughRoomBelow && enoughRoomAbove) {
      verticalPosition = 'above';
    } else if (previousVerticalPosition === 'above' && !enoughRoomAbove && enoughRoomBelow) {
      verticalPosition = 'below';
    } else if (!previousVerticalPosition) {
      verticalPosition = enoughRoomBelow ? 'below' : 'above';
    } else {
      verticalPosition = previousVerticalPosition;
    }
    style.top = triggerTopWithScroll + (verticalPosition === 'below' ? triggerHeight : -dropdownHeight);
  }

  /**
  Custom paper-autocomplete positioning logic.

  If there is enough room to position dropdown below the trigger,
  we need to use the inner input element for correct positioning.
  **/
  if (verticalPosition === 'below') {
    let triggerInput = trigger.querySelector('input');
    let { top: triggerInputTop, height: triggerInputHeight } = triggerInput.getBoundingClientRect();
    style.top = triggerTopWithScroll + (triggerInputTop - triggerTop) + triggerInputHeight;
  }

  return { horizontalPosition, verticalPosition, style };
}
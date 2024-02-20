function _determineAutoPosition(targetElement, tooltipLayer, desiredTooltipPosition) {

    // Take a clone of position precedence. These will be the available
    var possiblePositions = this._options.positionPrecedence.slice();

    var windowSize = _getWinSize();
    var tooltipHeight = _getOffset(tooltipLayer).height + 10;
    var tooltipWidth = _getOffset(tooltipLayer).width + 20;
    var targetOffset = _getOffset(targetElement);

    // If we check all the possible areas, and there are no valid places for the tooltip, the element
    // must take up most of the screen real estate. Show the tooltip floating in the middle of the screen.
    var calculatedPosition = "floating";

    // Check if the width of the tooltip + the starting point would spill off the right side of the screen
    // If no, neither bottom or top are valid
    if (targetOffset.left + tooltipWidth > windowSize.width || ((targetOffset.left + (targetOffset.width / 2)) - tooltipWidth) < 0) {
      _removeEntry(possiblePositions, "bottom");
      _removeEntry(possiblePositions, "top");
    } else {
      // Check for space below
      if ((targetOffset.height + targetOffset.top + tooltipHeight) > windowSize.height) {
        _removeEntry(possiblePositions, "bottom");
      }

      // Check for space above
      if (targetOffset.top - tooltipHeight < 0) {
        _removeEntry(possiblePositions, "top");
      }
    }

    // Check for space to the right
    if (targetOffset.width + targetOffset.left + tooltipWidth > windowSize.width) {
      _removeEntry(possiblePositions, "right");
    }

    // Check for space to the left
    if (targetOffset.left - tooltipWidth < 0) {
      _removeEntry(possiblePositions, "left");
    }

    // At this point, our array only has positions that are valid. Pick the first one, as it remains in order
    if (possiblePositions.length > 0) {
      calculatedPosition = possiblePositions[0];
    }

    // If the requested position is in the list, replace our calculated choice with that
    if (desiredTooltipPosition && desiredTooltipPosition != "auto") {
      if (possiblePositions.indexOf(desiredTooltipPosition) > -1) {
        calculatedPosition = desiredTooltipPosition;
      }
    }

    return calculatedPosition;
  }
function getClosestHandle(clickedPosition) {
                var smallestDifference = 100;
                var handleNumber = false;
                scope_Handles.forEach(function (handle, index) {
                    // Disabled handles are ignored
                    if (isHandleDisabled(index)) {
                        return;
                    }
                    var handlePosition = scope_Locations[index];
                    var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
                    // Initial state
                    var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;
                    // Difference with this handle is smaller than the previously checked handle
                    var isCloser = differenceWithThisHandle < smallestDifference;
                    var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
                    if (isCloser || isCloserAfter || clickAtEdge) {
                        handleNumber = index;
                        smallestDifference = differenceWithThisHandle;
                    }
                });
                return handleNumber;
            }
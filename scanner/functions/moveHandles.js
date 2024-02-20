function moveHandles(upward, proposal, locations, handleNumbers, connect) {
                var proposals = locations.slice();
                // Store first handle now, so we still have it in case handleNumbers is reversed
                var firstHandle = handleNumbers[0];
                var smoothSteps = options.events.smoothSteps;
                var b = [!upward, upward];
                var f = [upward, !upward];
                // Copy handleNumbers so we don't change the dataset
                handleNumbers = handleNumbers.slice();
                // Check to see which handle is 'leading'.
                // If that one can't move the second can't either.
                if (upward) {
                    handleNumbers.reverse();
                }
                // Step 1: get the maximum percentage that any of the handles can move
                if (handleNumbers.length > 1) {
                    handleNumbers.forEach(function (handleNumber, o) {
                        var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false, smoothSteps);
                        // Stop if one of the handles can't move.
                        if (to === false) {
                            proposal = 0;
                        }
                        else {
                            proposal = to - proposals[handleNumber];
                            proposals[handleNumber] = to;
                        }
                    });
                }
                // If using one handle, check backward AND forward
                else {
                    b = f = [true];
                }
                var state = false;
                // Step 2: Try to set the handles with the found percentage
                handleNumbers.forEach(function (handleNumber, o) {
                    state =
                        setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o], false, smoothSteps) || state;
                });
                // Step 3: If a handle moved, fire events
                if (state) {
                    handleNumbers.forEach(function (handleNumber) {
                        fireEvent("update", handleNumber);
                        fireEvent("slide", handleNumber);
                    });
                    // If target is a connect, then fire drag event
                    if (connect != undefined) {
                        fireEvent("drag", firstHandle);
                    }
                }
            }
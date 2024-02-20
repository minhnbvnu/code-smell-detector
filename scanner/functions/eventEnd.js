function eventEnd(event, data) {
                // The handle is no longer active, so remove the class.
                if (data.handle) {
                    removeClass(data.handle, options.cssClasses.active);
                    scope_ActiveHandlesCount -= 1;
                }
                // Unbind the move and end events, which are added on 'start'.
                data.listeners.forEach(function (c) {
                    scope_DocumentElement.removeEventListener(c[0], c[1]);
                });
                if (scope_ActiveHandlesCount === 0) {
                    // Remove dragging class.
                    removeClass(scope_Target, options.cssClasses.drag);
                    setZindex();
                    // Remove cursor styles and text-selection events bound to the body.
                    if (event.cursor) {
                        scope_Body.style.cursor = "";
                        scope_Body.removeEventListener("selectstart", preventDefault);
                    }
                }
                if (options.events.smoothSteps) {
                    data.handleNumbers.forEach(function (handleNumber) {
                        setHandle(handleNumber, scope_Locations[handleNumber], true, true, false, false);
                    });
                    data.handleNumbers.forEach(function (handleNumber) {
                        fireEvent("update", handleNumber);
                    });
                }
                data.handleNumbers.forEach(function (handleNumber) {
                    fireEvent("change", handleNumber);
                    fireEvent("set", handleNumber);
                    fireEvent("end", handleNumber);
                });
            }
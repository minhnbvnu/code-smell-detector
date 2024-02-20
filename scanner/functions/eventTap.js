function eventTap(event) {
                // The tap event shouldn't propagate up
                event.stopPropagation();
                var proposal = calcPointToPercentage(event.calcPoint);
                var handleNumber = getClosestHandle(proposal);
                // Tackle the case that all handles are 'disabled'.
                if (handleNumber === false) {
                    return;
                }
                // Flag the slider as it is now in a transitional state.
                // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
                if (!options.events.snap) {
                    addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                }
                setHandle(handleNumber, proposal, true, true);
                setZindex();
                fireEvent("slide", handleNumber, true);
                fireEvent("update", handleNumber, true);
                if (!options.events.snap) {
                    fireEvent("change", handleNumber, true);
                    fireEvent("set", handleNumber, true);
                }
                else {
                    eventStart(event, { handleNumbers: [handleNumber] });
                }
            }
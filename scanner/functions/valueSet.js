function valueSet(input, fireSetEvent, exactInput) {
                var values = asArray(input);
                var isInit = scope_Locations[0] === undefined;
                // Event fires by default
                fireSetEvent = fireSetEvent === undefined ? true : fireSetEvent;
                // Animation is optional.
                // Make sure the initial values were set before using animated placement.
                if (options.animate && !isInit) {
                    addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                }
                // First pass, without lookAhead but with lookBackward. Values are set from left to right.
                scope_HandleNumbers.forEach(function (handleNumber) {
                    setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
                });
                var i = scope_HandleNumbers.length === 1 ? 0 : 1;
                // Spread handles evenly across the slider if the range has no size (min=max)
                if (isInit && scope_Spectrum.hasNoSize()) {
                    exactInput = true;
                    scope_Locations[0] = 0;
                    if (scope_HandleNumbers.length > 1) {
                        var space_1 = 100 / (scope_HandleNumbers.length - 1);
                        scope_HandleNumbers.forEach(function (handleNumber) {
                            scope_Locations[handleNumber] = handleNumber * space_1;
                        });
                    }
                }
                // Secondary passes. Now that all base values are set, apply constraints.
                // Iterate all handles to ensure constraints are applied for the entire slider (Issue #1009)
                for (; i < scope_HandleNumbers.length; ++i) {
                    scope_HandleNumbers.forEach(function (handleNumber) {
                        setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
                    });
                }
                setZindex();
                scope_HandleNumbers.forEach(function (handleNumber) {
                    fireEvent("update", handleNumber);
                    // Fire the event only for handles that received a new value, as per #579
                    if (values[handleNumber] !== null && fireSetEvent) {
                        fireEvent("set", handleNumber);
                    }
                });
            }
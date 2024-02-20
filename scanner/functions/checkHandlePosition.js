function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue, smoothSteps) {
                var distance;
                // For sliders with multiple handles, limit movement to the other handle.
                // Apply the margin option by adding it to the handle positions.
                if (scope_Handles.length > 1 && !options.events.unconstrained) {
                    if (lookBackward && handleNumber > 0) {
                        distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                        to = Math.max(to, distance);
                    }
                    if (lookForward && handleNumber < scope_Handles.length - 1) {
                        distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                        to = Math.min(to, distance);
                    }
                }
                // The limit option has the opposite effect, limiting handles to a
                // maximum distance from another. Limit must be > 0, as otherwise
                // handles would be unmovable.
                if (scope_Handles.length > 1 && options.limit) {
                    if (lookBackward && handleNumber > 0) {
                        distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                        to = Math.min(to, distance);
                    }
                    if (lookForward && handleNumber < scope_Handles.length - 1) {
                        distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                        to = Math.max(to, distance);
                    }
                }
                // The padding option keeps the handles a certain distance from the
                // edges of the slider. Padding must be > 0.
                if (options.padding) {
                    if (handleNumber === 0) {
                        distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                        to = Math.max(to, distance);
                    }
                    if (handleNumber === scope_Handles.length - 1) {
                        distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                        to = Math.min(to, distance);
                    }
                }
                if (!smoothSteps) {
                    to = scope_Spectrum.getStep(to);
                }
                // Limit percentage to the 0 - 100 range
                to = limit(to);
                // Return false if handle can't move
                if (to === reference[handleNumber] && !getValue) {
                    return false;
                }
                return to;
            }
function eventKeydown(event, handleNumber) {
                if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
                    return false;
                }
                var horizontalKeys = ["Left", "Right"];
                var verticalKeys = ["Down", "Up"];
                var largeStepKeys = ["PageDown", "PageUp"];
                var edgeKeys = ["Home", "End"];
                if (options.dir && !options.ort) {
                    // On an right-to-left slider, the left and right keys act inverted
                    horizontalKeys.reverse();
                }
                else if (options.ort && !options.dir) {
                    // On a top-to-bottom slider, the up and down keys act inverted
                    verticalKeys.reverse();
                    largeStepKeys.reverse();
                }
                // Strip "Arrow" for IE compatibility. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
                var key = event.key.replace("Arrow", "");
                var isLargeDown = key === largeStepKeys[0];
                var isLargeUp = key === largeStepKeys[1];
                var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
                var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
                var isMin = key === edgeKeys[0];
                var isMax = key === edgeKeys[1];
                if (!isDown && !isUp && !isMin && !isMax) {
                    return true;
                }
                event.preventDefault();
                var to;
                if (isUp || isDown) {
                    var direction = isDown ? 0 : 1;
                    var steps = getNextStepsForHandle(handleNumber);
                    var step = steps[direction];
                    // At the edge of a slider, do nothing
                    if (step === null) {
                        return false;
                    }
                    // No step set, use the default of 10% of the sub-range
                    if (step === false) {
                        step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
                    }
                    if (isLargeUp || isLargeDown) {
                        step *= options.keyboardPageMultiplier;
                    }
                    else {
                        step *= options.keyboardMultiplier;
                    }
                    // Step over zero-length ranges (#948);
                    step = Math.max(step, 0.0000001);
                    // Decrement for down steps
                    step = (isDown ? -1 : 1) * step;
                    to = scope_Values[handleNumber] + step;
                }
                else if (isMax) {
                    // End key
                    to = options.spectrum.xVal[options.spectrum.xVal.length - 1];
                }
                else {
                    // Home key
                    to = options.spectrum.xVal[0];
                }
                setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
                fireEvent("slide", handleNumber);
                fireEvent("update", handleNumber);
                fireEvent("change", handleNumber);
                fireEvent("set", handleNumber);
                return false;
            }
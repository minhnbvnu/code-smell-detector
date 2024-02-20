function getNextStepsForHandle(handleNumber) {
                var location = scope_Locations[handleNumber];
                var nearbySteps = scope_Spectrum.getNearbySteps(location);
                var value = scope_Values[handleNumber];
                var increment = nearbySteps.thisStep.step;
                var decrement = null;
                // If snapped, directly use defined step value
                if (options.snap) {
                    return [
                        value - nearbySteps.stepBefore.startValue || null,
                        nearbySteps.stepAfter.startValue - value || null,
                    ];
                }
                // If the next value in this step moves into the next step,
                // the increment is the start of the next step - the current value
                if (increment !== false) {
                    if (value + increment > nearbySteps.stepAfter.startValue) {
                        increment = nearbySteps.stepAfter.startValue - value;
                    }
                }
                // If the value is beyond the starting point
                if (value > nearbySteps.thisStep.startValue) {
                    decrement = nearbySteps.thisStep.step;
                }
                else if (nearbySteps.stepBefore.step === false) {
                    decrement = false;
                }
                // If a handle is at the start of a step, it always steps back into the previous step first
                else {
                    decrement = value - nearbySteps.stepBefore.highestStep;
                }
                // Now, if at the slider edges, there is no in/decrement
                if (location === 100) {
                    increment = null;
                }
                else if (location === 0) {
                    decrement = null;
                }
                // As per #391, the comparison for the decrement step can have some rounding issues.
                var stepDecimals = scope_Spectrum.countStepDecimals();
                // Round per #391
                if (increment !== null && increment !== false) {
                    increment = Number(increment.toFixed(stepDecimals));
                }
                if (decrement !== null && decrement !== false) {
                    decrement = Number(decrement.toFixed(stepDecimals));
                }
                return [decrement, increment];
            }
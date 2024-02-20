function generateSpread(pips) {
                function safeIncrement(value, increment) {
                    // Avoid floating point variance by dropping the smallest decimal places.
                    return Number((value + increment).toFixed(7));
                }
                var group = getGroup(pips);
                var indexes = {};
                var firstInRange = scope_Spectrum.xVal[0];
                var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
                var ignoreFirst = false;
                var ignoreLast = false;
                var prevPct = 0;
                // Create a copy of the group, sort it and filter away all duplicates.
                group = unique(group.slice().sort(function (a, b) {
                    return a - b;
                }));
                // Make sure the range starts with the first element.
                if (group[0] !== firstInRange) {
                    group.unshift(firstInRange);
                    ignoreFirst = true;
                }
                // Likewise for the last one.
                if (group[group.length - 1] !== lastInRange) {
                    group.push(lastInRange);
                    ignoreLast = true;
                }
                group.forEach(function (current, index) {
                    // Get the current step and the lower + upper positions.
                    var step;
                    var i;
                    var q;
                    var low = current;
                    var high = group[index + 1];
                    var newPct;
                    var pctDifference;
                    var pctPos;
                    var type;
                    var steps;
                    var realSteps;
                    var stepSize;
                    var isSteps = pips.mode === exports.PipsMode.Steps;
                    // When using 'steps' mode, use the provided steps.
                    // Otherwise, we'll step on to the next subrange.
                    if (isSteps) {
                        step = scope_Spectrum.xNumSteps[index];
                    }
                    // Default to a 'full' step.
                    if (!step) {
                        step = high - low;
                    }
                    // If high is undefined we are at the last subrange. Make sure it iterates once (#1088)
                    if (high === undefined) {
                        high = low;
                    }
                    // Make sure step isn't 0, which would cause an infinite loop (#654)
                    step = Math.max(step, 0.0000001);
                    // Find all steps in the subrange.
                    for (i = low; i <= high; i = safeIncrement(i, step)) {
                        // Get the percentage value for the current step,
                        // calculate the size for the subrange.
                        newPct = scope_Spectrum.toStepping(i);
                        pctDifference = newPct - prevPct;
                        steps = pctDifference / (pips.density || 1);
                        realSteps = Math.round(steps);
                        // This ratio represents the amount of percentage-space a point indicates.
                        // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-divided.
                        // Round the percentage offset to an even number, then divide by two
                        // to spread the offset on both sides of the range.
                        stepSize = pctDifference / realSteps;
                        // Divide all points evenly, adding the correct number to this subrange.
                        // Run up to <= so that 100% gets a point, event if ignoreLast is set.
                        for (q = 1; q <= realSteps; q += 1) {
                            // The ratio between the rounded value and the actual size might be ~1% off.
                            // Correct the percentage offset by the number of points
                            // per subrange. density = 1 will result in 100 points on the
                            // full range, 2 for 50, 4 for 25, etc.
                            pctPos = prevPct + q * stepSize;
                            indexes[pctPos.toFixed(5)] = [scope_Spectrum.fromStepping(pctPos), 0];
                        }
                        // Determine the point type.
                        type = group.indexOf(i) > -1 ? exports.PipsType.LargeValue : isSteps ? exports.PipsType.SmallValue : exports.PipsType.NoValue;
                        // Enforce the 'ignoreFirst' option by overwriting the type for 0.
                        if (!index && ignoreFirst && i !== high) {
                            type = 0;
                        }
                        if (!(i === high && ignoreLast)) {
                            // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
                            indexes[newPct.toFixed(5)] = [i, type];
                        }
                        // Update the percentage count.
                        prevPct = newPct;
                    }
                });
                return indexes;
            }
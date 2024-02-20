function testPadding(parsed, entry) {
            var index;
            if (!isNumeric(entry) && !Array.isArray(entry)) {
                throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
            }
            if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) {
                throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
            }
            if (entry === 0) {
                return;
            }
            if (!Array.isArray(entry)) {
                entry = [entry, entry];
            }
            // 'getDistance' returns false for invalid values.
            parsed.padding = [parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1])];
            for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) {
                // last "range" can't contain step size as it is purely an endpoint.
                if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) {
                    throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
                }
            }
            var totalPadding = entry[0] + entry[1];
            var firstValue = parsed.spectrum.xVal[0];
            var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
            if (totalPadding / (lastValue - firstValue) > 1) {
                throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
            }
        }
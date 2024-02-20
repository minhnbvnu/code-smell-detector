function testLimit(parsed, entry) {
            if (!isNumeric(entry)) {
                throw new Error("noUiSlider: 'limit' option must be numeric.");
            }
            parsed.limit = parsed.spectrum.getDistance(entry);
            if (!parsed.limit || parsed.handles < 2) {
                throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
            }
        }
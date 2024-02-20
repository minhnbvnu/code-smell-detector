function testMargin(parsed, entry) {
            if (!isNumeric(entry)) {
                throw new Error("noUiSlider: 'margin' option must be numeric.");
            }
            // Issue #582
            if (entry === 0) {
                return;
            }
            parsed.margin = parsed.spectrum.getDistance(entry);
        }
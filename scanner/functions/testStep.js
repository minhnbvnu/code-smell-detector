function testStep(parsed, entry) {
            if (!isNumeric(entry)) {
                throw new Error("noUiSlider: 'step' is not numeric.");
            }
            // The step option can still be used to set stepping
            // for linear sliders. Overwritten if set in 'range'.
            parsed.singleStep = entry;
        }
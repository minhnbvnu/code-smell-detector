function testKeyboardDefaultStep(parsed, entry) {
            if (!isNumeric(entry)) {
                throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
            }
            parsed.keyboardDefaultStep = entry;
        }
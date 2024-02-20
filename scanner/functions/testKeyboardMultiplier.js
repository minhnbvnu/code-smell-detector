function testKeyboardMultiplier(parsed, entry) {
            if (!isNumeric(entry)) {
                throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
            }
            parsed.keyboardMultiplier = entry;
        }
function testKeyboardPageMultiplier(parsed, entry) {
            if (!isNumeric(entry)) {
                throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
            }
            parsed.keyboardPageMultiplier = entry;
        }
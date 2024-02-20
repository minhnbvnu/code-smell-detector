function testKeyboardSupport(parsed, entry) {
            if (typeof entry !== "boolean") {
                throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
            }
            parsed.keyboardSupport = entry;
        }
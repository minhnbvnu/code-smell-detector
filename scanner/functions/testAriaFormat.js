function testAriaFormat(parsed, entry) {
            if (!isValidPartialFormatter(entry)) {
                throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
            }
            parsed.ariaFormat = entry;
        }
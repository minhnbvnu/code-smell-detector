function testFormat(parsed, entry) {
            if (!isValidFormatter(entry)) {
                throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
            }
            parsed.format = entry;
        }
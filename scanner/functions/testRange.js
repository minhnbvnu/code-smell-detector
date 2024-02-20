function testRange(parsed, entry) {
            // Filter incorrect input.
            if (typeof entry !== "object" || Array.isArray(entry)) {
                throw new Error("noUiSlider: 'range' is not an object.");
            }
            // Catch missing start or end.
            if (entry.min === undefined || entry.max === undefined) {
                throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
            }
            parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
        }
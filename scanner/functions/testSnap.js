function testSnap(parsed, entry) {
            if (typeof entry !== "boolean") {
                throw new Error("noUiSlider: 'snap' option must be a boolean.");
            }
            // Enforce 100% stepping within subranges.
            parsed.snap = entry;
        }
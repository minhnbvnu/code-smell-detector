function testAnimate(parsed, entry) {
            if (typeof entry !== "boolean") {
                throw new Error("noUiSlider: 'animate' option must be a boolean.");
            }
            // Enforce 100% stepping within subranges.
            parsed.animate = entry;
        }
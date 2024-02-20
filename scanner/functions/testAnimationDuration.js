function testAnimationDuration(parsed, entry) {
            if (typeof entry !== "number") {
                throw new Error("noUiSlider: 'animationDuration' option must be a number.");
            }
            parsed.animationDuration = entry;
        }
function testCssClasses(parsed, entry) {
            if (typeof entry !== "object") {
                throw new Error("noUiSlider: 'cssClasses' must be an object.");
            }
            if (typeof parsed.cssPrefix === "string") {
                parsed.cssClasses = {};
                Object.keys(entry).forEach(function (key) {
                    parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
                });
            }
            else {
                parsed.cssClasses = entry;
            }
        }
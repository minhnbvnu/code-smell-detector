function testStart(parsed, entry) {
            entry = asArray(entry);
            // Validate input. Values aren't tested, as the public .val method
            // will always provide a valid location.
            if (!Array.isArray(entry) || !entry.length) {
                throw new Error("noUiSlider: 'start' option is incorrect.");
            }
            // Store the number of handles.
            parsed.handles = entry.length;
            // When the slider is initialized, the .val method will
            // be called with the start options.
            parsed.start = entry;
        }
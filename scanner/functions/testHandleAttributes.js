function testHandleAttributes(parsed, entry) {
            if (entry.length !== parsed.handles) {
                throw new Error("noUiSlider: must pass a attributes for all handles.");
            }
            parsed.handleAttributes = entry;
        }
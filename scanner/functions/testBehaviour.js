function testBehaviour(parsed, entry) {
            // Make sure the input is a string.
            if (typeof entry !== "string") {
                throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
            }
            // Check if the string contains any keywords.
            // None are required.
            var tap = entry.indexOf("tap") >= 0;
            var drag = entry.indexOf("drag") >= 0;
            var fixed = entry.indexOf("fixed") >= 0;
            var snap = entry.indexOf("snap") >= 0;
            var hover = entry.indexOf("hover") >= 0;
            var unconstrained = entry.indexOf("unconstrained") >= 0;
            var dragAll = entry.indexOf("drag-all") >= 0;
            var smoothSteps = entry.indexOf("smooth-steps") >= 0;
            if (fixed) {
                if (parsed.handles !== 2) {
                    throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
                }
                // Use margin to enforce fixed state
                testMargin(parsed, parsed.start[1] - parsed.start[0]);
            }
            if (unconstrained && (parsed.margin || parsed.limit)) {
                throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
            }
            parsed.events = {
                tap: tap || snap,
                drag: drag,
                dragAll: dragAll,
                smoothSteps: smoothSteps,
                fixed: fixed,
                snap: snap,
                hover: hover,
                unconstrained: unconstrained,
            };
        }
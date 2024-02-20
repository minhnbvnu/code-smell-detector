function testDirection(parsed, entry) {
            // Set direction as a numerical value for easy parsing.
            // Invert connection for RTL sliders, so that the proper
            // handles get the connect/background classes.
            switch (entry) {
                case "ltr":
                    parsed.dir = 0;
                    break;
                case "rtl":
                    parsed.dir = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'direction' option was not recognized.");
            }
        }
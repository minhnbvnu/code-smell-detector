function testOrientation(parsed, entry) {
            // Set orientation to an a numerical value for easy
            // array selection.
            switch (entry) {
                case "horizontal":
                    parsed.ort = 0;
                    break;
                case "vertical":
                    parsed.ort = 1;
                    break;
                default:
                    throw new Error("noUiSlider: 'orientation' option is invalid.");
            }
        }
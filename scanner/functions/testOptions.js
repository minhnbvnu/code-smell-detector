function testOptions(options) {
            // To prove a fix for #537, freeze options here.
            // If the object is modified, an error will be thrown.
            // Object.freeze(options);
            var parsed = {
                margin: null,
                limit: null,
                padding: null,
                animate: true,
                animationDuration: 300,
                ariaFormat: defaultFormatter,
                format: defaultFormatter,
            };
            // Tests are executed in the order they are presented here.
            var tests = {
                step: { r: false, t: testStep },
                keyboardPageMultiplier: { r: false, t: testKeyboardPageMultiplier },
                keyboardMultiplier: { r: false, t: testKeyboardMultiplier },
                keyboardDefaultStep: { r: false, t: testKeyboardDefaultStep },
                start: { r: true, t: testStart },
                connect: { r: true, t: testConnect },
                direction: { r: true, t: testDirection },
                snap: { r: false, t: testSnap },
                animate: { r: false, t: testAnimate },
                animationDuration: { r: false, t: testAnimationDuration },
                range: { r: true, t: testRange },
                orientation: { r: false, t: testOrientation },
                margin: { r: false, t: testMargin },
                limit: { r: false, t: testLimit },
                padding: { r: false, t: testPadding },
                behaviour: { r: true, t: testBehaviour },
                ariaFormat: { r: false, t: testAriaFormat },
                format: { r: false, t: testFormat },
                tooltips: { r: false, t: testTooltips },
                keyboardSupport: { r: true, t: testKeyboardSupport },
                documentElement: { r: false, t: testDocumentElement },
                cssPrefix: { r: true, t: testCssPrefix },
                cssClasses: { r: true, t: testCssClasses },
                handleAttributes: { r: false, t: testHandleAttributes },
            };
            var defaults = {
                connect: false,
                direction: "ltr",
                behaviour: "tap",
                orientation: "horizontal",
                keyboardSupport: true,
                cssPrefix: "noUi-",
                cssClasses: cssClasses,
                keyboardPageMultiplier: 5,
                keyboardMultiplier: 1,
                keyboardDefaultStep: 10,
            };
            // AriaFormat defaults to regular format, if any.
            if (options.format && !options.ariaFormat) {
                options.ariaFormat = options.format;
            }
            // Run all options through a testing mechanism to ensure correct
            // input. It should be noted that options might get modified to
            // be handled properly. E.g. wrapping integers in arrays.
            Object.keys(tests).forEach(function (name) {
                // If the option isn't set, but it is required, throw an error.
                if (!isSet(options[name]) && defaults[name] === undefined) {
                    if (tests[name].r) {
                        throw new Error("noUiSlider: '" + name + "' is required.");
                    }
                    return;
                }
                tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
            });
            // Forward pips options
            parsed.pips = options.pips;
            // All recent browsers accept unprefixed transform.
            // We need -ms- for IE9 and -webkit- for older Android;
            // Assume use of -webkit- if unprefixed and -ms- are not supported.
            // https://caniuse.com/#feat=transforms2d
            var d = document.createElement("div");
            var msPrefix = d.style.msTransform !== undefined;
            var noPrefix = d.style.transform !== undefined;
            parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
            // Pips don't move, so we can place them using left/top.
            var styles = [
                ["left", "top"],
                ["right", "bottom"],
            ];
            parsed.style = styles[parsed.dir][parsed.ort];
            return parsed;
        }
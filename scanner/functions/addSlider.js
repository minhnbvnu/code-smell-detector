function addSlider(addTarget) {
                // Apply classes and data to the target.
                addClass(addTarget, options.cssClasses.target);
                if (options.dir === 0) {
                    addClass(addTarget, options.cssClasses.ltr);
                }
                else {
                    addClass(addTarget, options.cssClasses.rtl);
                }
                if (options.ort === 0) {
                    addClass(addTarget, options.cssClasses.horizontal);
                }
                else {
                    addClass(addTarget, options.cssClasses.vertical);
                }
                var textDirection = getComputedStyle(addTarget).direction;
                if (textDirection === "rtl") {
                    addClass(addTarget, options.cssClasses.textDirectionRtl);
                }
                else {
                    addClass(addTarget, options.cssClasses.textDirectionLtr);
                }
                return addNodeTo(addTarget, options.cssClasses.base);
            }
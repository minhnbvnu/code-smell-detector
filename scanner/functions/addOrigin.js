function addOrigin(base, handleNumber) {
                var origin = addNodeTo(base, options.cssClasses.origin);
                var handle = addNodeTo(origin, options.cssClasses.handle);
                addNodeTo(handle, options.cssClasses.touchArea);
                handle.setAttribute("data-handle", String(handleNumber));
                if (options.keyboardSupport) {
                    // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
                    // 0 = focusable and reachable
                    handle.setAttribute("tabindex", "0");
                    handle.addEventListener("keydown", function (event) {
                        return eventKeydown(event, handleNumber);
                    });
                }
                if (options.handleAttributes !== undefined) {
                    var attributes_1 = options.handleAttributes[handleNumber];
                    Object.keys(attributes_1).forEach(function (attribute) {
                        handle.setAttribute(attribute, attributes_1[attribute]);
                    });
                }
                handle.setAttribute("role", "slider");
                handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
                if (handleNumber === 0) {
                    addClass(handle, options.cssClasses.handleLower);
                }
                else if (handleNumber === options.handles - 1) {
                    addClass(handle, options.cssClasses.handleUpper);
                }
                origin.handle = handle;
                return origin;
            }
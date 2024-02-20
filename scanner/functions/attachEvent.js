function attachEvent(events, element, callback, data) {
                // This function can be used to 'filter' events to the slider.
                // element is a node, not a nodeList
                var method = function (event) {
                    var e = fixEvent(event, data.pageOffset, data.target || element);
                    // fixEvent returns false if this event has a different target
                    // when handling (multi-) touch events;
                    if (!e) {
                        return false;
                    }
                    // doNotReject is passed by all end events to make sure released touches
                    // are not rejected, leaving the slider "stuck" to the cursor;
                    if (isSliderDisabled() && !data.doNotReject) {
                        return false;
                    }
                    // Stop if an active 'tap' transition is taking place.
                    if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) {
                        return false;
                    }
                    // Ignore right or middle clicks on start #454
                    if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
                        return false;
                    }
                    // Ignore right or middle clicks on start #454
                    if (data.hover && e.buttons) {
                        return false;
                    }
                    // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
                    // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
                    // touch-action: manipulation, but that allows panning, which breaks
                    // sliders after zooming/on non-responsive pages.
                    // See: https://bugs.webkit.org/show_bug.cgi?id=133112
                    if (!supportsPassive) {
                        e.preventDefault();
                    }
                    e.calcPoint = e.points[options.ort];
                    // Call the event handler with the event [ and additional data ].
                    callback(e, data);
                    return;
                };
                var methods = [];
                // Bind a closure on the target for every event type.
                events.split(" ").forEach(function (eventName) {
                    element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
                    methods.push([eventName, method]);
                });
                return methods;
            }
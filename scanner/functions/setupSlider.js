function setupSlider() {
                // Create the base element, initialize HTML and set classes.
                // Add handles and connect elements.
                scope_Base = addSlider(scope_Target);
                addElements(options.connect, scope_Base);
                // Attach user events.
                bindSliderEvents(options.events);
                // Use the public value method to set the start values.
                valueSet(options.start);
                if (options.pips) {
                    pips(options.pips);
                }
                if (options.tooltips) {
                    tooltips();
                }
                aria();
            }
function addElements(connectOptions, base) {
                var connectBase = addNodeTo(base, options.cssClasses.connects);
                scope_Handles = [];
                scope_Connects = [];
                scope_Connects.push(addConnect(connectBase, connectOptions[0]));
                // [::::O====O====O====]
                // connectOptions = [0, 1, 1, 1]
                for (var i = 0; i < options.handles; i++) {
                    // Keep a list of all added handles.
                    scope_Handles.push(addOrigin(base, i));
                    scope_HandleNumbers[i] = i;
                    scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
                }
            }
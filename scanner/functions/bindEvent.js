function bindEvent(namespacedEvent, callback) {
                scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
                scope_Events[namespacedEvent].push(callback);
                // If the event bound is 'update,' fire it immediately for all handles.
                if (namespacedEvent.split(".")[0] === "update") {
                    scope_Handles.forEach(function (a, index) {
                        fireEvent("update", index);
                    });
                }
            }
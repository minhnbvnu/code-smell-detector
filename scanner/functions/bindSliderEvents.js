function bindSliderEvents(behaviour) {
                // Attach the standard drag event to the handles.
                if (!behaviour.fixed) {
                    scope_Handles.forEach(function (handle, index) {
                        // These events are only bound to the visual handle
                        // element, not the 'real' origin element.
                        attachEvent(actions.start, handle.children[0], eventStart, {
                            handleNumbers: [index],
                        });
                    });
                }
                // Attach the tap event to the slider base.
                if (behaviour.tap) {
                    attachEvent(actions.start, scope_Base, eventTap, {});
                }
                // Fire hover events
                if (behaviour.hover) {
                    attachEvent(actions.move, scope_Base, eventHover, {
                        hover: true,
                    });
                }
                // Make the range draggable.
                if (behaviour.drag) {
                    scope_Connects.forEach(function (connect, index) {
                        if (connect === false || index === 0 || index === scope_Connects.length - 1) {
                            return;
                        }
                        var handleBefore = scope_Handles[index - 1];
                        var handleAfter = scope_Handles[index];
                        var eventHolders = [connect];
                        var handlesToDrag = [handleBefore, handleAfter];
                        var handleNumbersToDrag = [index - 1, index];
                        addClass(connect, options.cssClasses.draggable);
                        // When the range is fixed, the entire range can
                        // be dragged by the handles. The handle in the first
                        // origin will propagate the start event upward,
                        // but it needs to be bound manually on the other.
                        if (behaviour.fixed) {
                            eventHolders.push(handleBefore.children[0]);
                            eventHolders.push(handleAfter.children[0]);
                        }
                        if (behaviour.dragAll) {
                            handlesToDrag = scope_Handles;
                            handleNumbersToDrag = scope_HandleNumbers;
                        }
                        eventHolders.forEach(function (eventHolder) {
                            attachEvent(actions.start, eventHolder, eventStart, {
                                handles: handlesToDrag,
                                handleNumbers: handleNumbersToDrag,
                                connect: connect,
                            });
                        });
                    });
                }
            }
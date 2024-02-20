function eventStart(event, data) {
                // Ignore event if any handle is disabled
                if (data.handleNumbers.some(isHandleDisabled)) {
                    return;
                }
                var handle;
                if (data.handleNumbers.length === 1) {
                    var handleOrigin = scope_Handles[data.handleNumbers[0]];
                    handle = handleOrigin.children[0];
                    scope_ActiveHandlesCount += 1;
                    // Mark the handle as 'active' so it can be styled.
                    addClass(handle, options.cssClasses.active);
                }
                // A drag should never propagate up to the 'tap' event.
                event.stopPropagation();
                // Record the event listeners.
                var listeners = [];
                // Attach the move and end events.
                var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                    // The event target has changed so we need to propagate the original one so that we keep
                    // relying on it to extract target touches.
                    target: event.target,
                    handle: handle,
                    connect: data.connect,
                    listeners: listeners,
                    startCalcPoint: event.calcPoint,
                    baseSize: baseSize(),
                    pageOffset: event.pageOffset,
                    handleNumbers: data.handleNumbers,
                    buttonsProperty: event.buttons,
                    locations: scope_Locations.slice(),
                });
                var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                    target: event.target,
                    handle: handle,
                    listeners: listeners,
                    doNotReject: true,
                    handleNumbers: data.handleNumbers,
                });
                var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                    target: event.target,
                    handle: handle,
                    listeners: listeners,
                    doNotReject: true,
                    handleNumbers: data.handleNumbers,
                });
                // We want to make sure we pushed the listeners in the listener list rather than creating
                // a new one as it has already been passed to the event handlers.
                listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
                // Text selection isn't an issue on touch devices,
                // so adding cursor styles can be skipped.
                if (event.cursor) {
                    // Prevent the 'I' cursor and extend the range-drag cursor.
                    scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                    // Mark the target with a dragging state.
                    if (scope_Handles.length > 1) {
                        addClass(scope_Target, options.cssClasses.drag);
                    }
                    // Prevent text selection when dragging the handles.
                    // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
                    // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
                    // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
                    // The 'cursor' flag is false.
                    // See: http://caniuse.com/#search=selectstart
                    scope_Body.addEventListener("selectstart", preventDefault, false);
                }
                data.handleNumbers.forEach(function (handleNumber) {
                    fireEvent("start", handleNumber);
                });
            }
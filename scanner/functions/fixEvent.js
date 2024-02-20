function fixEvent(e, pageOffset, eventTarget) {
                // Filter the event to register the type, which can be
                // touch, mouse or pointer. Offset changes need to be
                // made on an event specific basis.
                var touch = e.type.indexOf("touch") === 0;
                var mouse = e.type.indexOf("mouse") === 0;
                var pointer = e.type.indexOf("pointer") === 0;
                var x = 0;
                var y = 0;
                // IE10 implemented pointer events with a prefix;
                if (e.type.indexOf("MSPointer") === 0) {
                    pointer = true;
                }
                // Erroneous events seem to be passed in occasionally on iOS/iPadOS after user finishes interacting with
                // the slider. They appear to be of type MouseEvent, yet they don't have usual properties set. Ignore
                // events that have no touches or buttons associated with them. (#1057, #1079, #1095)
                if (e.type === "mousedown" && !e.buttons && !e.touches) {
                    return false;
                }
                // The only thing one handle should be concerned about is the touches that originated on top of it.
                if (touch) {
                    // Returns true if a touch originated on the target.
                    var isTouchOnTarget = function (checkTouch) {
                        var target = checkTouch.target;
                        return (target === eventTarget ||
                            eventTarget.contains(target) ||
                            (e.composed && e.composedPath().shift() === eventTarget));
                    };
                    // In the case of touchstart events, we need to make sure there is still no more than one
                    // touch on the target so we look amongst all touches.
                    if (e.type === "touchstart") {
                        var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                        // Do not support more than one touch per handle.
                        if (targetTouches.length > 1) {
                            return false;
                        }
                        x = targetTouches[0].pageX;
                        y = targetTouches[0].pageY;
                    }
                    else {
                        // In the other cases, find on changedTouches is enough.
                        var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                        // Cancel if the target touch has not moved.
                        if (!targetTouch) {
                            return false;
                        }
                        x = targetTouch.pageX;
                        y = targetTouch.pageY;
                    }
                }
                pageOffset = pageOffset || getPageOffset(scope_Document);
                if (mouse || pointer) {
                    x = e.clientX + pageOffset.x;
                    y = e.clientY + pageOffset.y;
                }
                e.pageOffset = pageOffset;
                e.points = [x, y];
                e.cursor = mouse || pointer; // Fix #435
                return e;
            }
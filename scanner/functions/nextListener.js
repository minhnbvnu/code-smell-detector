function nextListener() {
            var listener, event_obj;

            // We want the next listener
            current_event_idx++;

            // If we've ran out of listeners end this emit call
            if (!listeners[current_event_idx]) {
                emitComplete();
                return;
            }

            // Object the listener ammends to tell us what it's going to do
            event_obj = {
                // If changed to true, expect this listener is going to callback
                wait: false,

                // If wait is true, this callback must be called to continue running listeners
                callback: function () {
                    // Invalidate this callback incase a listener decides to call it again
                    event_obj.callback = undefined;

                    nextListener.apply(that);
                },

                // Prevents the default 'done' functions from executing
                preventDefault: function () {
                    prevented = true;
                }
            };


            listener = listeners[current_event_idx];
            listener[1].call(listener[2] || that, event_obj, event_data);

            // If the listener hasn't signalled it's going to wait, proceed to next listener
            if (!event_obj.wait) {
                // Invalidate the callback just incase a listener decides to call it anyway
                event_obj.callback = undefined;

                nextListener();
            }
        }
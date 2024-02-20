function handleRAF() {
                if (rafCallbacks.length === 0) {
                    if (timer) {
                        timer.update();
                    }
                    activeRAF = null;
                    return;
                }
                // schedule next animation frame
                activeRAF = raf.next(handleRAF);
                // poll for changes
                poll();
                // fire a callback for all pending rafs
                for (var i = rafCallbacks.length - 1; i >= 0; --i) {
                    var cb = rafCallbacks[i];
                    if (cb) {
                        cb(contextState, null, 0);
                    }
                }
                // flush all pending webgl calls
                gl.flush();
                // poll GPU timers *after* gl.flush so we don't delay command dispatch
                if (timer) {
                    timer.update();
                }
            }
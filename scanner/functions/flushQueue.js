function flushQueue() {
        var next, task;
        while (!currentlyRunningATask && (next = queueHead.next)) {
            queueHead = next; // If this task fails, don't retry it.
            if ((task = tasksByHandle[next.handle])) {
                currentlyRunningATask = true;
                try {
                    task();
                    currentlyRunningATask = false;
                } finally {
                    clearImmediate(next.handle);
                    if (currentlyRunningATask) {
                        currentlyRunningATask = false;
                        // The call to task() must have thrown an
                        // exception if we reach this point, so, just in
                        // case there are tasks remaining to be executed,
                        // we schedule another flushQueue in a later tick
                        // of the event loop, and let the exception
                        // propagate uncaught.
                        if (queueHead.next) {
                            setImmediate(flushQueue);
                        }
                    }
                }
            }
        }
    }
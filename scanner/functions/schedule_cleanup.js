function schedule_cleanup(connections) {
        if (dirty_set.size === 0) {
            (async () => {
                await (0, defer_1.defer)();
                cleanup_dirty_set();
            })();
        }
        dirty_set.add(connections);
    }
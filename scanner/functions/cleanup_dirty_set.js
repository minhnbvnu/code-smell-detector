function cleanup_dirty_set() {
        for (const connections of dirty_set) {
            (0, array_1.remove_by)(connections, (connection) => connection.signal == null);
        }
        dirty_set.clear();
    }
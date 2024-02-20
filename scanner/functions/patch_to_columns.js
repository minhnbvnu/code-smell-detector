function patch_to_columns(data, patches) {
        let patched = new Set();
        for (const [column, patch] of (0, object_1.entries)(patches)) {
            patched = (0, set_1.union)(patched, patch_to_column(data[column], patch)); // XXX
        }
        return patched;
    }
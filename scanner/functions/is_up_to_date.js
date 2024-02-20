function is_up_to_date(base_dir, file, metadata) {
        const contents = (0, sys_1.read)((0, path_1.join)(base_dir, file));
        if (contents == null)
            return false;
        const old_hash = metadata.signatures[file];
        if (old_hash == null)
            return false;
        const new_hash = (0, sys_1.hash)(contents);
        return old_hash == new_hash;
    }
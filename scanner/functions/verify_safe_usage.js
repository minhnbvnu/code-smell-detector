function verify_safe_usage(def, read, modified) {
            if (def.id in in_use_ids) return;
            if (read && modified) {
                in_use_ids[def.id] = read;
                in_use.push(def);
            } else {
                value_read[def.id] = read;
                value_modified[def.id] = modified;
            }
        }
function make_nested_lookup(obj) {
            const out = new Map();
            for (var key of Object.keys(obj)) {
                out.set(key, makePredicate(obj[key]));
            }
            const does_have = (global_name, fname) => {
                const inner_map = out.get(global_name);
                return inner_map != null && inner_map.has(fname);
            };
            return does_have;
        }
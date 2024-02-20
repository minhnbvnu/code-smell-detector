function add_def(def) {
                var name = def.name;
                if (def.global && cache && cache.has(name))
                    name = cache.get(name);
                else if (!def.unmangleable(options))
                    return;
                to_avoid(name);
            }
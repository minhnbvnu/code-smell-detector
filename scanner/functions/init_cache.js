function init_cache(cache) {
            if (!cache)
                return;
            if (!("props" in cache)) {
                cache.props = new Map();
            }
            else if (!(cache.props instanceof Map)) {
                cache.props = map_from_object(cache.props);
            }
        }
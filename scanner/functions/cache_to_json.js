function cache_to_json(cache) {
            return {
                props: map_to_object(cache.props)
            };
        }
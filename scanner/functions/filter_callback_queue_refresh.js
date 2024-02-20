function filter_callback_queue_refresh (evt) {
        if (!filter_timeout_id) {
            return filter_refresh_visible_nbexts();
        }
        clearTimeout(filter_timeout_id);
        filter_timeout_id = setTimeout(filter_refresh_visible_nbexts, 100);
    }
function with_log_level(level, fn) {
        const original = set_log_level(level);
        try {
            fn();
        }
        finally {
            set_log_level(original);
        }
    }
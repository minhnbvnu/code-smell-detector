function is_stream(obj) {
        return typeof obj.pipe === 'function';
    }
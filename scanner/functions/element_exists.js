function element_exists(id) {
        if ($(id).length === 0) {
            return false;
        }
        return true;
    }
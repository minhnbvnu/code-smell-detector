function is_touch(event) {
        return typeof TouchEvent !== "undefined" && event instanceof TouchEvent;
    }
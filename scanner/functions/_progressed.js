function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }
function is_single_cursor(dict1, dict2) {
        return ((dict1.line == dict2.line) && (dict1.ch == dict2.ch));
    }
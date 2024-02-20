function is_Color(value) {
        if ((0, types_1.isInteger)(value))
            return true;
        if ((0, types_1.isString)(value) && css4_parse(value) != null)
            return true;
        if ((0, types_1.isArray)(value) && (value.length == 3 || value.length == 4))
            return true;
        return false;
    }
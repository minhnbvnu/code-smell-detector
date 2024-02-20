function is_Keyable(obj) {
        return (0, types_1.isObject)(obj) && "_keydown" in obj && "_keyup" in obj;
    }
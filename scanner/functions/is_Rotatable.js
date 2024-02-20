function is_Rotatable(obj) {
        return (0, types_1.isObject)(obj) && "_rotate_start" in obj && "_rotate" in obj && "_rotate_end" in obj;
    }
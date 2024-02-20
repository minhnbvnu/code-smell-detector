function is_Tapable(obj) {
        return (0, types_1.isObject)(obj) && "_tap" in obj;
    }
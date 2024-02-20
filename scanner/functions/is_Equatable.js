function is_Equatable(obj) {
        return (0, types_1.isObject)(obj) && exports.equals in obj;
    }
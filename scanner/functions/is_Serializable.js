function is_Serializable(obj) {
        return (0, types_1.isObject)(obj) && exports.serialize in obj;
    }
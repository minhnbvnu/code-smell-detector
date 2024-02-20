function is_HasProps(obj) {
        return (0, types_1.isObject)(obj) && obj.prototype instanceof has_props_1.HasProps;
    }
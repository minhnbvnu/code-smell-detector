function is_ref(obj) {
        return (0, types_1.isPlainObject)(obj) && "id" in obj && !("type" in obj);
    }
function is_Pannable(obj) {
        return (0, types_1.isObject)(obj) && "_pan_start" in obj && "_pan" in obj && "_pan_end" in obj;
    }
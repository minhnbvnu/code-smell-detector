function is_Pinchable(obj) {
        return (0, types_1.isObject)(obj) && "_pinch_start" in obj && "_pinch" in obj && "_pinch_end" in obj;
    }
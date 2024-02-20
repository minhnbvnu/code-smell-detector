function is_Moveable(obj) {
        return (0, types_1.isObject)(obj) && "_move_start" in obj && "_move" in obj && "_move_end" in obj;
    }
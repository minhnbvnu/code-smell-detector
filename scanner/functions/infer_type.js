function infer_type(a0, a1) {
        if (a0 instanceof Float64Array || a0 instanceof Array)
            return Float64Array;
        if (a1 instanceof Float64Array || a1 instanceof Array)
            return Float64Array;
        return Float32Array;
    }
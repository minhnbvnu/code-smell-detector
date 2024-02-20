function stream_to_column(col, new_col, rollover) {
        if ((0, types_1.isArray)(col) && (0, types_1.isArray)(new_col)) {
            const result = col.concat(new_col);
            if (rollover != null && result.length > rollover)
                return result.slice(-rollover);
            else
                return result;
        }
        const total_len = col.length + new_col.length;
        // handle rollover case for typed arrays
        if (rollover != null && total_len > rollover) {
            const start = total_len - rollover;
            const end = col.length;
            // resize col if it is shorter than the rollover length
            const result = (() => {
                if (col.length < rollover) {
                    const ctor = (() => {
                        if ((0, types_1.isTypedArray)(col))
                            return col.constructor;
                        else if ((0, types_1.isTypedArray)(new_col))
                            return new_col.constructor;
                        else
                            throw new Error("unsupported array types");
                    })();
                    const result = new ctor(rollover);
                    result.set(col, 0);
                    return result;
                }
                else
                    return col;
            })();
            // shift values in original col to accommodate new_col
            for (let i = start, endi = end; i < endi; i++) {
                result[i - start] = result[i];
            }
            // update end values in col with new_col
            for (let i = 0, endi = new_col.length; i < endi; i++) {
                result[i + (end - start)] = new_col[i];
            }
            return result;
        }
        else {
            const col_ = (() => {
                if ((0, types_1.isTypedArray)(col))
                    return col;
                else if ((0, types_1.isTypedArray)(new_col))
                    return new new_col.constructor(col);
                else
                    throw new Error("unsupported array types");
            })();
            return typed_array.concat(col_, new_col);
        }
    }
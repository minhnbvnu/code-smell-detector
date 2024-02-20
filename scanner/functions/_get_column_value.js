function _get_column_value(name, data_source, ind) {
        const column = data_source.get_column(name);
        // missing column
        if (column == null)
            return null;
        // null index (e.g for patch)
        if (ind == null)
            return null;
        // typical (non-image) index
        if ((0, types_1.isNumber)(ind))
            return column[ind];
        // image index
        const data = column[ind.index];
        if ((0, types_1.isTypedArray)(data) || (0, types_1.isArray)(data)) {
            // inspect array of arrays
            if ((0, types_1.isArray)(data[0])) {
                const row = data[ind.j];
                return row[ind.i];
            }
            else
                return data[ind.flat_index]; // inspect flat array
        }
        else
            return data; // inspect per-image scalar data
    }
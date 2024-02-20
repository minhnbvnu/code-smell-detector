function toC(value, type) {
        if (type == 'string') {
            if (value === null || value === undefined || value === 0) return 0; // null string
            value = intArrayFromString(value);
            type = 'array';
        }
        if (type == 'array') {
            if (!stack) stack = Runtime.stackSave();
            var ret = Runtime.stackAlloc(value.length);
            writeArrayToMemory(value, ret);
            return ret;
        }
        return value;
    }
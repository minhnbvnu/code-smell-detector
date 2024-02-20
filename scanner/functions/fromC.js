function fromC(value, type) {
        if (type == 'string') {
            return Pointer_stringify(value);
        }
        assert(type != 'array');
        return value;
    }
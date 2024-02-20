function resolveMap(source) {
        var gen = convert.fromSource(source);
        return gen ? gen.toObject() : null;
    }
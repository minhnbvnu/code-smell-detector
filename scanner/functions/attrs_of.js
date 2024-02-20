function attrs_of(model, prefix, mixin, prefixed = false) {
        const attrs = {};
        for (const attr of (0, object_1.keys)(mixin)) {
            const prefixed_attr = `${prefix}${attr}`;
            const value = model[prefixed_attr];
            attrs[prefixed ? prefixed_attr : attr] = value;
        }
        return attrs;
    }
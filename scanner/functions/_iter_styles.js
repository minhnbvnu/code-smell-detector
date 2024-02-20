function* _iter_styles(styles) {
        if (styles instanceof styles_1.Styles) {
            const model_attrs = new Set((0, object_1.keys)(model_1.Model.prototype._props));
            for (const prop of styles) {
                if (!model_attrs.has(prop.attr)) {
                    yield [prop.attr, prop.get_value()];
                }
            }
        }
        else
            yield* (0, object_1.entries)(styles);
    }
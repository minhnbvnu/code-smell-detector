function decode_def(def, deserializer) {
        var _a, _b;
        var _c;
        function kind_of(ref) {
            if ((0, types_1.isString)(ref)) {
                switch (ref) {
                    case "Any": return kinds.Any;
                    case "Unknown": return kinds.Unknown;
                    case "Boolean": return kinds.Boolean;
                    case "Number": return kinds.Number;
                    case "Int": return kinds.Int;
                    case "Bytes": return kinds.Bytes;
                    case "String": return kinds.String;
                    case "Null": return kinds.Null;
                }
            }
            else {
                switch (ref[0]) {
                    case "Regex": {
                        const [, regex, flags] = ref;
                        return kinds.Regex(new RegExp(regex, flags));
                    }
                    case "Nullable": {
                        const [, subref] = ref;
                        return kinds.Nullable(kind_of(subref));
                    }
                    case "Or": {
                        const [, subref, ...subrefs] = ref;
                        return kinds.Or(kind_of(subref), ...subrefs.map(kind_of));
                    }
                    case "Tuple": {
                        const [, subref, ...subrefs] = ref;
                        return kinds.Tuple(kind_of(subref), ...subrefs.map(kind_of));
                    }
                    case "Array": {
                        const [, subref] = ref;
                        return kinds.Array(kind_of(subref));
                    }
                    case "Struct": {
                        const [, ...entryrefs] = ref;
                        const entries = entryrefs.map(([key, valref]) => [key, kind_of(valref)]);
                        return kinds.Struct((0, object_1.to_object)(entries));
                    }
                    case "Dict": {
                        const [, valref] = ref;
                        return kinds.Dict(kind_of(valref));
                    }
                    case "Map": {
                        const [, keyref, valref] = ref;
                        return kinds.Map(kind_of(keyref), kind_of(valref));
                    }
                    case "Enum": {
                        const [, ...items] = ref;
                        return kinds.Enum(...items);
                    }
                    case "Ref": {
                        const [, modelref] = ref;
                        const model = deserializer.resolver.get(modelref.id);
                        if (model != null)
                            return kinds.Ref(model);
                        else
                            throw new Error(`${modelref.id} wasn't defined before referencing it`);
                    }
                    case "AnyRef": {
                        return kinds.AnyRef();
                    }
                }
            }
        }
        const base = (() => {
            var _a, _b;
            const name = (_b = (_a = def.extends) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "Model";
            if (name == "Model") // TODO: support base classes in general
                return model_1.Model;
            const base = deserializer.resolver.get(name);
            if (base != null)
                return base;
            else
                throw new Error(`base model ${name} of ${def.name} is not defined`);
        })();
        const model = (_c = class extends base {
        },
            tslib_1.__setFunctionName(_c, "model"),
            _c.__qualified__ = def.name,
            _c);
        function decode(value) {
            if (value === undefined)
                return value;
            else
                return deserializer.decode(value);
        }
        for (const prop of (_a = def.properties) !== null && _a !== void 0 ? _a : []) {
            const kind = kind_of(prop.kind);
            model.define({ [prop.name]: [kind, decode(prop.default)] });
        }
        for (const prop of (_b = def.overrides) !== null && _b !== void 0 ? _b : []) {
            model.override({ [prop.name]: decode(prop.default) });
        }
        deserializer.resolver.register(model);
        return model;
    }
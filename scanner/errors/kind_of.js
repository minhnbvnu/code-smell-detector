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
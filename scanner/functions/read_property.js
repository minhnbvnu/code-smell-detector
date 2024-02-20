function read_property(obj, key) {
            key = get_simple_key(key);
            if (key instanceof AST_Node)
                return;
            var value;
            if (obj instanceof AST_Array) {
                var elements = obj.elements;
                if (key == "length")
                    return make_node_from_constant(elements.length, obj);
                if (typeof key == "number" && key in elements)
                    value = elements[key];
            }
            else if (obj instanceof AST_Object) {
                key = "" + key;
                var props = obj.properties;
                for (var i = props.length; --i >= 0;) {
                    var prop = props[i];
                    if (!(prop instanceof AST_ObjectKeyVal))
                        return;
                    if (!value && props[i].key === key)
                        value = props[i].value;
                }
            }
            return value instanceof AST_SymbolRef && value.fixed_value() || value;
        }
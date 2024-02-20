function to_destructured(node) {
        if (node instanceof AST_Array) {
            var rest = null;
            if (node.elements[node.elements.length - 1] instanceof AST_Spread) {
                rest = to_destructured(node.elements.pop().expression);
                if (!(rest instanceof AST_Destructured || is_assignable(rest))) return node;
            }
            var elements = node.elements.map(to_destructured);
            return all(elements, function(node) {
                return node instanceof AST_DefaultValue
                    || node instanceof AST_Destructured
                    || node instanceof AST_Hole
                    || is_assignable(node);
            }) ? new AST_DestructuredArray({
                start: node.start,
                elements: elements,
                rest: rest,
                end: node.end,
            }) : node;
        }
        if (node instanceof AST_Assign) {
            var name = to_destructured(node.left);
            return name instanceof AST_Destructured || is_assignable(name) ? new AST_DefaultValue({
                start: node.start,
                name: name,
                value: node.right,
                end: node.end,
            }) : node;
        }
        if (!(node instanceof AST_Object)) return node;
        var rest = null;
        if (node.properties[node.properties.length - 1] instanceof AST_Spread) {
            rest = to_destructured(node.properties.pop().expression);
            if (!(rest instanceof AST_Destructured || is_assignable(rest))) return node;
        }
        var props = [];
        for (var i = 0; i < node.properties.length; i++) {
            var prop = node.properties[i];
            if (!(prop instanceof AST_ObjectKeyVal)) return node;
            var value = to_destructured(prop.value);
            if (!(value instanceof AST_DefaultValue || value instanceof AST_Destructured || is_assignable(value))) {
                return node;
            }
            props.push(new AST_DestructuredKeyVal({
                start: prop.start,
                key: prop.key,
                value: value,
                end: prop.end,
            }));
        }
        return new AST_DestructuredObject({
            start: node.start,
            properties: props,
            rest: rest,
            end: node.end,
        });
    }
function to_destructuring(node) {
                if (node instanceof AST_Object) {
                    node = new AST_Destructuring({
                        start: node.start,
                        names: node.properties.map(to_destructuring),
                        is_array: false,
                        end: node.end
                    });
                }
                else if (node instanceof AST_Array) {
                    var names = [];
                    for (var i = 0; i < node.elements.length; i++) {
                        // Only allow expansion as last element
                        if (node.elements[i] instanceof AST_Expansion) {
                            if (i + 1 !== node.elements.length) {
                                token_error(node.elements[i].start, "Spread must the be last element in destructuring array");
                            }
                            node.elements[i].expression = to_destructuring(node.elements[i].expression);
                        }
                        names.push(to_destructuring(node.elements[i]));
                    }
                    node = new AST_Destructuring({
                        start: node.start,
                        names: names,
                        is_array: true,
                        end: node.end
                    });
                }
                else if (node instanceof AST_ObjectProperty) {
                    node.value = to_destructuring(node.value);
                }
                else if (node instanceof AST_Assign) {
                    node = new AST_DefaultAssign({
                        start: node.start,
                        left: node.left,
                        operator: "=",
                        right: node.right,
                        end: node.end
                    });
                }
                return node;
            }
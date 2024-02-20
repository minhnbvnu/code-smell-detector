function isObjectOrClassMethod(node) {
                const parent = node.parent;
                return (parent.type === "MethodDefinition" || (parent.type === "Property" && (parent.method ||
                    parent.kind === "get" ||
                    parent.kind === "set")));
            }
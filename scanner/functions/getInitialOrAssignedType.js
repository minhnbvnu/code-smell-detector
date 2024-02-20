function getInitialOrAssignedType(flow) {
                    const node = flow.node;
                    return getNarrowableTypeForReference(node.kind === 257 /* VariableDeclaration */ || node.kind === 205 /* BindingElement */ ? getInitialType(node) : getAssignedType(node), reference);
                }
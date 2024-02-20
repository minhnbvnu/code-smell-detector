function isDuplicatedEnumNameVariable(variable) {
                const block = variable.scope.block;
                return (block.type === utils_1.AST_NODE_TYPES.TSEnumDeclaration &&
                    block.id === variable.identifiers[0]);
            }
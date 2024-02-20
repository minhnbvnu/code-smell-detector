function ambientDeclarationSelector(parent, childDeclare) {
                return [
                    // Types are ambiently exported
                    `${parent} > :matches(${[
                        utils_1.AST_NODE_TYPES.TSInterfaceDeclaration,
                        utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration,
                    ].join(', ')})`,
                    // Value things are ambiently exported if they are "declare"d
                    `${parent} > :matches(${[
                        utils_1.AST_NODE_TYPES.ClassDeclaration,
                        utils_1.AST_NODE_TYPES.TSDeclareFunction,
                        utils_1.AST_NODE_TYPES.TSEnumDeclaration,
                        utils_1.AST_NODE_TYPES.TSModuleDeclaration,
                        utils_1.AST_NODE_TYPES.VariableDeclaration,
                    ].join(', ')})${childDeclare ? '[declare = true]' : ''}`,
                ].join(', ');
            }
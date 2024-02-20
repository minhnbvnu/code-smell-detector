function getDesiredTypeForDefinition(node) {
                const { imports, previousSibling } = collectNodeDefinitions(node);
                // Case: Merged ambiently via module augmentation
                // import { MyEnum } from 'other-module';
                // declare module 'other-module' {
                //   enum MyEnum { A }
                // }
                for (const imported of imports) {
                    const typeFromImported = getTypeFromImported(imported);
                    if (typeFromImported !== undefined) {
                        return typeFromImported;
                    }
                }
                // Case: Multiple enum declarations in the same file
                // enum MyEnum { A }
                // enum MyEnum { B }
                if (previousSibling) {
                    return getMemberType(previousSibling.members[0]);
                }
                // Case: Namespace declaration merging
                // namespace MyNamespace {
                //   export enum MyEnum { A }
                // }
                // namespace MyNamespace {
                //   export enum MyEnum { B }
                // }
                if (node.parent.type === utils_1.AST_NODE_TYPES.ExportNamedDeclaration &&
                    node.parent.parent.type === utils_1.AST_NODE_TYPES.TSModuleBlock) {
                    // TODO: We don't need to dip into the TypeScript type checker here!
                    // Merged namespaces must all exist in the same file.
                    // We could instead compare this file's nodes to find the merges.
                    const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node.id);
                    const declarations = typeChecker
                        .getSymbolAtLocation(tsNode)
                        .getDeclarations();
                    for (const declaration of declarations) {
                        for (const member of declaration.members) {
                            return member.initializer
                                ? tsutils.isTypeFlagSet(typeChecker.getTypeAtLocation(member.initializer), ts.TypeFlags.StringLike)
                                    ? AllowedType.String
                                    : AllowedType.Number
                                : AllowedType.Number;
                        }
                    }
                }
                // Finally, we default to the type of the first enum member
                return getMemberType(node.members[0]);
            }
function generateNameForNode(node, privateName, flags, prefix, suffix) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                    case 80 /* PrivateIdentifier */:
                        return makeUniqueName2(getTextOfNode2(node), isUniqueName, !!(flags & 16 /* Optimistic */), !!(flags & 8 /* ReservedInNestedScopes */), privateName, prefix, suffix);
                    case 264 /* ModuleDeclaration */:
                    case 263 /* EnumDeclaration */:
                        Debug.assert(!prefix && !suffix && !privateName);
                        return generateNameForModuleOrEnum(node);
                    case 269 /* ImportDeclaration */:
                    case 275 /* ExportDeclaration */:
                        Debug.assert(!prefix && !suffix && !privateName);
                        return generateNameForImportOrExportDeclaration(node);
                    case 259 /* FunctionDeclaration */:
                    case 260 /* ClassDeclaration */: {
                        Debug.assert(!prefix && !suffix && !privateName);
                        const name = node.name;
                        if (name && !isGeneratedIdentifier(name)) {
                            return generateNameForNode(name, 
                            /*privateName*/
                            false, flags, prefix, suffix);
                        }
                        return generateNameForExportDefault();
                    }
                    case 274 /* ExportAssignment */:
                        Debug.assert(!prefix && !suffix && !privateName);
                        return generateNameForExportDefault();
                    case 228 /* ClassExpression */:
                        Debug.assert(!prefix && !suffix && !privateName);
                        return generateNameForClassExpression();
                    case 171 /* MethodDeclaration */:
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return generateNameForMethodOrAccessor(node, privateName, prefix, suffix);
                    case 164 /* ComputedPropertyName */:
                        return makeTempVariableName(0 /* Auto */, 
                        /*reserveInNestedScopes*/
                        true, privateName, prefix, suffix);
                    default:
                        return makeTempVariableName(0 /* Auto */, 
                        /*reserveInNestedScopes*/
                        false, privateName, prefix, suffix);
                }
            }
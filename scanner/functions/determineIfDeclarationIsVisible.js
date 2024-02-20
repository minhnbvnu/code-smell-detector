function determineIfDeclarationIsVisible() {
                    switch (node.kind) {
                        case 341 /* JSDocCallbackTag */:
                        case 349 /* JSDocTypedefTag */:
                        case 343 /* JSDocEnumTag */:
                            return !!(node.parent && node.parent.parent && node.parent.parent.parent && isSourceFile(node.parent.parent.parent));
                        case 205 /* BindingElement */:
                            return isDeclarationVisible(node.parent.parent);
                        case 257 /* VariableDeclaration */:
                            if (isBindingPattern(node.name) && !node.name.elements.length) {
                                return false;
                            }
                        case 264 /* ModuleDeclaration */:
                        case 260 /* ClassDeclaration */:
                        case 261 /* InterfaceDeclaration */:
                        case 262 /* TypeAliasDeclaration */:
                        case 259 /* FunctionDeclaration */:
                        case 263 /* EnumDeclaration */:
                        case 268 /* ImportEqualsDeclaration */:
                            if (isExternalModuleAugmentation(node)) {
                                return true;
                            }
                            const parent2 = getDeclarationContainer(node);
                            if (!(getCombinedModifierFlags(node) & 1 /* Export */) && !(node.kind !== 268 /* ImportEqualsDeclaration */ && parent2.kind !== 308 /* SourceFile */ && parent2.flags & 16777216 /* Ambient */)) {
                                return isGlobalSourceFile(parent2);
                            }
                            return isDeclarationVisible(parent2);
                        case 169 /* PropertyDeclaration */:
                        case 168 /* PropertySignature */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 171 /* MethodDeclaration */:
                        case 170 /* MethodSignature */:
                            if (hasEffectiveModifier(node, 8 /* Private */ | 16 /* Protected */)) {
                                return false;
                            }
                        case 173 /* Constructor */:
                        case 177 /* ConstructSignature */:
                        case 176 /* CallSignature */:
                        case 178 /* IndexSignature */:
                        case 166 /* Parameter */:
                        case 265 /* ModuleBlock */:
                        case 181 /* FunctionType */:
                        case 182 /* ConstructorType */:
                        case 184 /* TypeLiteral */:
                        case 180 /* TypeReference */:
                        case 185 /* ArrayType */:
                        case 186 /* TupleType */:
                        case 189 /* UnionType */:
                        case 190 /* IntersectionType */:
                        case 193 /* ParenthesizedType */:
                        case 199 /* NamedTupleMember */:
                            return isDeclarationVisible(node.parent);
                        case 270 /* ImportClause */:
                        case 271 /* NamespaceImport */:
                        case 273 /* ImportSpecifier */:
                            return false;
                        case 165 /* TypeParameter */:
                        case 308 /* SourceFile */:
                        case 267 /* NamespaceExportDeclaration */:
                            return true;
                        case 274 /* ExportAssignment */:
                            return false;
                        default:
                            return false;
                    }
                }
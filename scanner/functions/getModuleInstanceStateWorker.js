function getModuleInstanceStateWorker(node, visited) {
            switch (node.kind) {
                case 261 /* InterfaceDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                    return 0 /* NonInstantiated */;
                case 263 /* EnumDeclaration */:
                    if (isEnumConst(node)) {
                        return 2 /* ConstEnumOnly */;
                    }
                    break;
                case 269 /* ImportDeclaration */:
                case 268 /* ImportEqualsDeclaration */:
                    if (!hasSyntacticModifier(node, 1 /* Export */)) {
                        return 0 /* NonInstantiated */;
                    }
                    break;
                case 275 /* ExportDeclaration */:
                    const exportDeclaration = node;
                    if (!exportDeclaration.moduleSpecifier && exportDeclaration.exportClause && exportDeclaration.exportClause.kind === 276 /* NamedExports */) {
                        let state = 0 /* NonInstantiated */;
                        for (const specifier of exportDeclaration.exportClause.elements) {
                            const specifierState = getModuleInstanceStateForAliasTarget(specifier, visited);
                            if (specifierState > state) {
                                state = specifierState;
                            }
                            if (state === 1 /* Instantiated */) {
                                return state;
                            }
                        }
                        return state;
                    }
                    break;
                case 265 /* ModuleBlock */: {
                    let state = 0 /* NonInstantiated */;
                    forEachChild(node, (n) => {
                        const childState = getModuleInstanceStateCached(n, visited);
                        switch (childState) {
                            case 0 /* NonInstantiated */:
                                return;
                            case 2 /* ConstEnumOnly */:
                                state = 2 /* ConstEnumOnly */;
                                return;
                            case 1 /* Instantiated */:
                                state = 1 /* Instantiated */;
                                return true;
                            default:
                                Debug.assertNever(childState);
                        }
                    });
                    return state;
                }
                case 264 /* ModuleDeclaration */:
                    return getModuleInstanceState(node, visited);
                case 79 /* Identifier */:
                    if (node.flags & 2048 /* IdentifierIsInJSDocNamespace */) {
                        return 0 /* NonInstantiated */;
                    }
            }
            return 1 /* Instantiated */;
        }
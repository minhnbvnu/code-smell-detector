function checkModuleAugmentationElement(node, isGlobalAugmentation) {
                switch (node.kind) {
                    case 240 /* VariableStatement */:
                        for (const decl of node.declarationList.declarations) {
                            checkModuleAugmentationElement(decl, isGlobalAugmentation);
                        }
                        break;
                    case 274 /* ExportAssignment */:
                    case 275 /* ExportDeclaration */:
                        grammarErrorOnFirstToken(node, Diagnostics.Exports_and_export_assignments_are_not_permitted_in_module_augmentations);
                        break;
                    case 268 /* ImportEqualsDeclaration */:
                    case 269 /* ImportDeclaration */:
                        grammarErrorOnFirstToken(node, Diagnostics.Imports_are_not_permitted_in_module_augmentations_Consider_moving_them_to_the_enclosing_external_module);
                        break;
                    case 205 /* BindingElement */:
                    case 257 /* VariableDeclaration */:
                        const name = node.name;
                        if (isBindingPattern(name)) {
                            for (const el of name.elements) {
                                checkModuleAugmentationElement(el, isGlobalAugmentation);
                            }
                            break;
                        }
                    case 260 /* ClassDeclaration */:
                    case 263 /* EnumDeclaration */:
                    case 259 /* FunctionDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                    case 264 /* ModuleDeclaration */:
                    case 262 /* TypeAliasDeclaration */:
                        if (isGlobalAugmentation) {
                            return;
                        }
                        break;
                }
            }
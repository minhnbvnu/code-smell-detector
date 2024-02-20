function reportNonlocalAugmentation(containingFile, parentSymbol, symbol) {
                var _a2;
                const primaryDeclaration = (_a2 = parentSymbol.declarations) == null ? void 0 : _a2.find((d) => getSourceFileOfNode(d) === containingFile);
                const augmentingDeclarations = filter(symbol.declarations, (d) => getSourceFileOfNode(d) !== containingFile);
                if (primaryDeclaration && augmentingDeclarations) {
                    for (const augmentations of augmentingDeclarations) {
                        context.addDiagnostic(addRelatedInfo(createDiagnosticForNode(augmentations, Diagnostics.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized), createDiagnosticForNode(primaryDeclaration, Diagnostics.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file)));
                    }
                }
            }
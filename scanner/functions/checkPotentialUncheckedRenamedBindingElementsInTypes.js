function checkPotentialUncheckedRenamedBindingElementsInTypes() {
                var _a2;
                for (const node of potentialUnusedRenamedBindingElementsInTypes) {
                    if (!((_a2 = getSymbolOfDeclaration(node)) == null ? void 0 : _a2.isReferenced)) {
                        const wrappingDeclaration = walkUpBindingElementsAndPatterns(node);
                        Debug.assert(isParameterDeclaration(wrappingDeclaration), "Only parameter declaration should be checked here");
                        const diagnostic = createDiagnosticForNode(node.name, Diagnostics._0_is_an_unused_renaming_of_1_Did_you_intend_to_use_it_as_a_type_annotation, declarationNameToString(node.name), declarationNameToString(node.propertyName));
                        if (!wrappingDeclaration.type) {
                            addRelatedInfo(diagnostic, createFileDiagnostic(getSourceFileOfNode(wrappingDeclaration), wrappingDeclaration.end, 1, Diagnostics.We_can_only_write_a_type_for_0_by_adding_a_type_for_the_entire_parameter_here, declarationNameToString(node.propertyName)));
                        }
                        diagnostics.add(diagnostic);
                    }
                }
            }
function checkConstEnumAccess(node, type) {
                const ok = node.parent.kind === 208 /* PropertyAccessExpression */ && node.parent.expression === node || node.parent.kind === 209 /* ElementAccessExpression */ && node.parent.expression === node || ((node.kind === 79 /* Identifier */ || node.kind === 163 /* QualifiedName */) && isInRightSideOfImportOrExportAssignment(node) || node.parent.kind === 183 /* TypeQuery */ && node.parent.exprName === node) || node.parent.kind === 278 /* ExportSpecifier */;
                if (!ok) {
                    error(node, Diagnostics.const_enums_can_only_be_used_in_property_or_index_access_expressions_or_the_right_hand_side_of_an_import_declaration_or_export_assignment_or_type_query);
                }
                if (getIsolatedModules(compilerOptions)) {
                    Debug.assert(!!(type.symbol.flags & 128 /* ConstEnum */));
                    const constEnumDeclaration = type.symbol.valueDeclaration;
                    if (constEnumDeclaration.flags & 16777216 /* Ambient */) {
                        error(node, Diagnostics.Cannot_access_ambient_const_enums_when_0_is_enabled, isolatedModulesLikeFlagName);
                    }
                }
            }
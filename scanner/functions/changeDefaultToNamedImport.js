function changeDefaultToNamedImport(importingSourceFile, ref, changes, exportName) {
            const { parent: parent2 } = ref;
            switch (parent2.kind) {
                case 208 /* PropertyAccessExpression */:
                    changes.replaceNode(importingSourceFile, ref, factory.createIdentifier(exportName));
                    break;
                case 273 /* ImportSpecifier */:
                case 278 /* ExportSpecifier */: {
                    const spec = parent2;
                    changes.replaceNode(importingSourceFile, spec, makeImportSpecifier2(exportName, spec.name.text));
                    break;
                }
                case 270 /* ImportClause */: {
                    const clause = parent2;
                    Debug.assert(clause.name === ref, "Import clause name should match provided ref");
                    const spec = makeImportSpecifier2(exportName, ref.text);
                    const { namedBindings } = clause;
                    if (!namedBindings) {
                        changes.replaceNode(importingSourceFile, ref, factory.createNamedImports([spec]));
                    }
                    else if (namedBindings.kind === 271 /* NamespaceImport */) {
                        changes.deleteRange(importingSourceFile, { pos: ref.getStart(importingSourceFile), end: namedBindings.getStart(importingSourceFile) });
                        const quotePreference = isStringLiteral(clause.parent.moduleSpecifier) ? quotePreferenceFromString(clause.parent.moduleSpecifier, importingSourceFile) : 1 /* Double */;
                        const newImport = makeImport(
                        /*default*/
                        void 0, [makeImportSpecifier2(exportName, ref.text)], clause.parent.moduleSpecifier, quotePreference);
                        changes.insertNodeAfter(importingSourceFile, clause.parent, newImport);
                    }
                    else {
                        changes.delete(importingSourceFile, ref);
                        changes.insertNodeAtEndOfList(importingSourceFile, namedBindings.elements, spec);
                    }
                    break;
                }
                case 202 /* ImportType */:
                    const importTypeNode = parent2;
                    changes.replaceNode(importingSourceFile, parent2, factory.createImportTypeNode(importTypeNode.argument, importTypeNode.assertions, factory.createIdentifier(exportName), importTypeNode.typeArguments, importTypeNode.isTypeOf));
                    break;
                default:
                    Debug.failBadSyntaxKind(parent2);
            }
        }
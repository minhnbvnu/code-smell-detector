function getMeaningFromLocation(node) {
            node = getAdjustedReferenceLocation(node);
            const parent2 = node.parent;
            if (node.kind === 308 /* SourceFile */) {
                return 1 /* Value */;
            }
            else if (isExportAssignment(parent2) || isExportSpecifier(parent2) || isExternalModuleReference(parent2) || isImportSpecifier(parent2) || isImportClause(parent2) || isImportEqualsDeclaration(parent2) && node === parent2.name) {
                return 7 /* All */;
            }
            else if (isInRightSideOfInternalImportEqualsDeclaration(node)) {
                return getMeaningFromRightHandSideOfImportEquals(node);
            }
            else if (isDeclarationName(node)) {
                return getMeaningFromDeclaration(parent2);
            }
            else if (isEntityName(node) && findAncestor(node, or(isJSDocNameReference, isJSDocLinkLike, isJSDocMemberName))) {
                return 7 /* All */;
            }
            else if (isTypeReference(node)) {
                return 2 /* Type */;
            }
            else if (isNamespaceReference(node)) {
                return 4 /* Namespace */;
            }
            else if (isTypeParameterDeclaration(parent2)) {
                Debug.assert(isJSDocTemplateTag(parent2.parent));
                return 2 /* Type */;
            }
            else if (isLiteralTypeNode(parent2)) {
                return 2 /* Type */ | 1 /* Value */;
            }
            else {
                return 1 /* Value */;
            }
        }
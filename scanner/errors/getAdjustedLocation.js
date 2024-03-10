function getAdjustedLocation(node, forRename) {
            const { parent: parent2 } = node;
            if (isModifier(node) && (forRename || node.kind !== 88 /* DefaultKeyword */) ? canHaveModifiers(parent2) && contains(parent2.modifiers, node) : node.kind === 84 /* ClassKeyword */ ? isClassDeclaration(parent2) || isClassExpression(node) : node.kind === 98 /* FunctionKeyword */ ? isFunctionDeclaration(parent2) || isFunctionExpression(node) : node.kind === 118 /* InterfaceKeyword */ ? isInterfaceDeclaration(parent2) : node.kind === 92 /* EnumKeyword */ ? isEnumDeclaration(parent2) : node.kind === 154 /* TypeKeyword */ ? isTypeAliasDeclaration(parent2) : node.kind === 143 /* NamespaceKeyword */ || node.kind === 142 /* ModuleKeyword */ ? isModuleDeclaration(parent2) : node.kind === 100 /* ImportKeyword */ ? isImportEqualsDeclaration(parent2) : node.kind === 137 /* GetKeyword */ ? isGetAccessorDeclaration(parent2) : node.kind === 151 /* SetKeyword */ && isSetAccessorDeclaration(parent2)) {
                const location = getAdjustedLocationForDeclaration(parent2, forRename);
                if (location) {
                    return location;
                }
            }
            if ((node.kind === 113 /* VarKeyword */ || node.kind === 85 /* ConstKeyword */ || node.kind === 119 /* LetKeyword */) && isVariableDeclarationList(parent2) && parent2.declarations.length === 1) {
                const decl = parent2.declarations[0];
                if (isIdentifier(decl.name)) {
                    return decl.name;
                }
            }
            if (node.kind === 154 /* TypeKeyword */) {
                if (isImportClause(parent2) && parent2.isTypeOnly) {
                    const location = getAdjustedLocationForImportDeclaration(parent2.parent, forRename);
                    if (location) {
                        return location;
                    }
                }
                if (isExportDeclaration(parent2) && parent2.isTypeOnly) {
                    const location = getAdjustedLocationForExportDeclaration(parent2, forRename);
                    if (location) {
                        return location;
                    }
                }
            }
            if (node.kind === 128 /* AsKeyword */) {
                if (isImportSpecifier(parent2) && parent2.propertyName || isExportSpecifier(parent2) && parent2.propertyName || isNamespaceImport(parent2) || isNamespaceExport(parent2)) {
                    return parent2.name;
                }
                if (isExportDeclaration(parent2) && parent2.exportClause && isNamespaceExport(parent2.exportClause)) {
                    return parent2.exportClause.name;
                }
            }
            if (node.kind === 100 /* ImportKeyword */ && isImportDeclaration(parent2)) {
                const location = getAdjustedLocationForImportDeclaration(parent2, forRename);
                if (location) {
                    return location;
                }
            }
            if (node.kind === 93 /* ExportKeyword */) {
                if (isExportDeclaration(parent2)) {
                    const location = getAdjustedLocationForExportDeclaration(parent2, forRename);
                    if (location) {
                        return location;
                    }
                }
                if (isExportAssignment(parent2)) {
                    return skipOuterExpressions(parent2.expression);
                }
            }
            if (node.kind === 147 /* RequireKeyword */ && isExternalModuleReference(parent2)) {
                return parent2.expression;
            }
            if (node.kind === 158 /* FromKeyword */ && (isImportDeclaration(parent2) || isExportDeclaration(parent2)) && parent2.moduleSpecifier) {
                return parent2.moduleSpecifier;
            }
            if ((node.kind === 94 /* ExtendsKeyword */ || node.kind === 117 /* ImplementsKeyword */) && isHeritageClause(parent2) && parent2.token === node.kind) {
                const location = getAdjustedLocationForHeritageClause(parent2);
                if (location) {
                    return location;
                }
            }
            if (node.kind === 94 /* ExtendsKeyword */) {
                if (isTypeParameterDeclaration(parent2) && parent2.constraint && isTypeReferenceNode(parent2.constraint)) {
                    return parent2.constraint.typeName;
                }
                if (isConditionalTypeNode(parent2) && isTypeReferenceNode(parent2.extendsType)) {
                    return parent2.extendsType.typeName;
                }
            }
            if (node.kind === 138 /* InferKeyword */ && isInferTypeNode(parent2)) {
                return parent2.typeParameter.name;
            }
            if (node.kind === 101 /* InKeyword */ && isTypeParameterDeclaration(parent2) && isMappedTypeNode(parent2.parent)) {
                return parent2.name;
            }
            if (node.kind === 141 /* KeyOfKeyword */ && isTypeOperatorNode(parent2) && parent2.operator === 141 /* KeyOfKeyword */ && isTypeReferenceNode(parent2.type)) {
                return parent2.type.typeName;
            }
            if (node.kind === 146 /* ReadonlyKeyword */ && isTypeOperatorNode(parent2) && parent2.operator === 146 /* ReadonlyKeyword */ && isArrayTypeNode(parent2.type) && isTypeReferenceNode(parent2.type.elementType)) {
                return parent2.type.elementType.typeName;
            }
            if (!forRename) {
                if (node.kind === 103 /* NewKeyword */ && isNewExpression(parent2) || node.kind === 114 /* VoidKeyword */ && isVoidExpression(parent2) || node.kind === 112 /* TypeOfKeyword */ && isTypeOfExpression(parent2) || node.kind === 133 /* AwaitKeyword */ && isAwaitExpression(parent2) || node.kind === 125 /* YieldKeyword */ && isYieldExpression(parent2) || node.kind === 89 /* DeleteKeyword */ && isDeleteExpression(parent2)) {
                    if (parent2.expression) {
                        return skipOuterExpressions(parent2.expression);
                    }
                }
                if ((node.kind === 101 /* InKeyword */ || node.kind === 102 /* InstanceOfKeyword */) && isBinaryExpression(parent2) && parent2.operatorToken === node) {
                    return skipOuterExpressions(parent2.right);
                }
                if (node.kind === 128 /* AsKeyword */ && isAsExpression(parent2) && isTypeReferenceNode(parent2.type)) {
                    return parent2.type.typeName;
                }
                if (node.kind === 101 /* InKeyword */ && isForInStatement(parent2) || node.kind === 162 /* OfKeyword */ && isForOfStatement(parent2)) {
                    return skipOuterExpressions(parent2.expression);
                }
            }
            return node;
        }
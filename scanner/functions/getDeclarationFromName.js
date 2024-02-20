function getDeclarationFromName(name) {
            const parent2 = name.parent;
            switch (name.kind) {
                case 10 /* StringLiteral */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                case 8 /* NumericLiteral */:
                    if (isComputedPropertyName(parent2))
                        return parent2.parent;
                case 79 /* Identifier */:
                    if (isDeclaration(parent2)) {
                        return parent2.name === name ? parent2 : void 0;
                    }
                    else if (isQualifiedName(parent2)) {
                        const tag = parent2.parent;
                        return isJSDocParameterTag(tag) && tag.name === parent2 ? tag : void 0;
                    }
                    else {
                        const binExp = parent2.parent;
                        return isBinaryExpression(binExp) && getAssignmentDeclarationKind(binExp) !== 0 /* None */ && (binExp.left.symbol || binExp.symbol) && getNameOfDeclaration(binExp) === name ? binExp : void 0;
                    }
                case 80 /* PrivateIdentifier */:
                    return isDeclaration(parent2) && parent2.name === name ? parent2 : void 0;
                default:
                    return void 0;
            }
        }
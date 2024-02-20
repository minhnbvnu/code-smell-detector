function getAssignmentDeclarationPropertyAccessKind(lhs) {
            if (lhs.expression.kind === 108 /* ThisKeyword */) {
                return 4 /* ThisProperty */;
            }
            else if (isModuleExportsAccessExpression(lhs)) {
                return 2 /* ModuleExports */;
            }
            else if (isBindableStaticNameExpression(lhs.expression, 
            /*excludeThisKeyword*/
            true)) {
                if (isPrototypeAccess(lhs.expression)) {
                    return 3 /* PrototypeProperty */;
                }
                let nextToLast = lhs;
                while (!isIdentifier(nextToLast.expression)) {
                    nextToLast = nextToLast.expression;
                }
                const id = nextToLast.expression;
                if ((id.escapedText === "exports" || id.escapedText === "module" && getElementOrPropertyAccessName(nextToLast) === "exports") && // ExportsProperty does not support binding with computed names
                    isBindableStaticAccessExpression(lhs)) {
                    return 1 /* ExportsProperty */;
                }
                if (isBindableStaticNameExpression(lhs, 
                /*excludeThisKeyword*/
                true) || isElementAccessExpression(lhs) && isDynamicName(lhs)) {
                    return 5 /* Property */;
                }
            }
            return 0 /* None */;
        }
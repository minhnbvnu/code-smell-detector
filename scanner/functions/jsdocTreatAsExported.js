function jsdocTreatAsExported(node) {
                if (node.parent && isModuleDeclaration(node)) {
                    node = node.parent;
                }
                if (!isJSDocTypeAlias(node))
                    return false;
                if (!isJSDocEnumTag(node) && !!node.fullName)
                    return true;
                const declName = getNameOfDeclaration(node);
                if (!declName)
                    return false;
                if (isPropertyAccessEntityNameExpression(declName.parent) && isTopLevelNamespaceAssignment(declName.parent))
                    return true;
                if (isDeclaration(declName.parent) && getCombinedModifierFlags(declName.parent) & 1 /* Export */)
                    return true;
                return false;
            }
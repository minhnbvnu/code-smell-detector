function getHelperVariableName(node) {
                let declarationName = node.name && isIdentifier(node.name) && !isGeneratedIdentifier(node.name) ? idText(node.name) : node.name && isPrivateIdentifier(node.name) && !isGeneratedIdentifier(node.name) ? idText(node.name).slice(1) : node.name && isStringLiteral(node.name) && isIdentifierText(node.name.text, 99 /* ESNext */) ? node.name.text : isClassLike(node) ? "class" : "member";
                if (isGetAccessor(node))
                    declarationName = `get_${declarationName}`;
                if (isSetAccessor(node))
                    declarationName = `set_${declarationName}`;
                if (node.name && isPrivateIdentifier(node.name))
                    declarationName = `private_${declarationName}`;
                if (isStatic(node))
                    declarationName = `static_${declarationName}`;
                return "_" + declarationName;
            }
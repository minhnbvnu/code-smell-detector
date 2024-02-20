function getEffectiveTypeAnnotationNode(node) {
            if (!isInJSFile(node) && isFunctionDeclaration(node))
                return void 0;
            const type = node.type;
            if (type || !isInJSFile(node))
                return type;
            return isJSDocPropertyLikeTag(node) ? node.typeExpression && node.typeExpression.type : getJSDocType(node);
        }
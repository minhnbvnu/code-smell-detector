function getEffectiveTypeParameterDeclarations(node) {
            if (isJSDocSignature(node)) {
                if (isJSDocOverloadTag(node.parent)) {
                    const jsDoc = getJSDocRoot(node.parent);
                    if (jsDoc && length(jsDoc.tags)) {
                        return flatMap(jsDoc.tags, (tag) => isJSDocTemplateTag(tag) ? tag.typeParameters : void 0);
                    }
                }
                return emptyArray;
            }
            if (isJSDocTypeAlias(node)) {
                Debug.assert(node.parent.kind === 323 /* JSDoc */);
                return flatMap(node.parent.tags, (tag) => isJSDocTemplateTag(tag) ? tag.typeParameters : void 0);
            }
            if (node.typeParameters) {
                return node.typeParameters;
            }
            if (canHaveIllegalTypeParameters(node) && node.typeParameters) {
                return node.typeParameters;
            }
            if (isInJSFile(node)) {
                const decls = getJSDocTypeParameterDeclarations(node);
                if (decls.length) {
                    return decls;
                }
                const typeTag = getJSDocType(node);
                if (typeTag && isFunctionTypeNode(typeTag) && typeTag.typeParameters) {
                    return typeTag.typeParameters;
                }
            }
            return emptyArray;
        }
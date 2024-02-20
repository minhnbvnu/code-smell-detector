function getJSDocTypeParameterDeclarations(node) {
            return flatMap(getJSDocTags(node), (tag) => isNonTypeAliasTemplate(tag) ? tag.typeParameters : void 0);
        }
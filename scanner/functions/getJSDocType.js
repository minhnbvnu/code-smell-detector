function getJSDocType(node) {
            let tag = getFirstJSDocTag(node, isJSDocTypeTag);
            if (!tag && isParameter(node)) {
                tag = find(getJSDocParameterTags(node), (tag2) => !!tag2.typeExpression);
            }
            return tag && tag.typeExpression && tag.typeExpression.type;
        }
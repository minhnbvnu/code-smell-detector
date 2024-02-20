function getJSDocTypeTag(node) {
            const tag = getFirstJSDocTag(node, isJSDocTypeTag);
            if (tag && tag.typeExpression && tag.typeExpression.type) {
                return tag;
            }
            return void 0;
        }
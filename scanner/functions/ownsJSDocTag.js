function ownsJSDocTag(hostNode, tag) {
            return !(isJSDocTypeTag(tag) || isJSDocSatisfiesTag(tag)) || !tag.parent || !isJSDoc(tag.parent) || !isParenthesizedExpression(tag.parent.parent) || tag.parent.parent === hostNode;
        }
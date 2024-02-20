function isNonTypeAliasTemplate(tag) {
            return isJSDocTemplateTag(tag) && !(tag.parent.kind === 323 /* JSDoc */ && (tag.parent.tags.some(isJSDocTypeAlias) || tag.parent.tags.some(isJSDocOverloadTag)));
        }
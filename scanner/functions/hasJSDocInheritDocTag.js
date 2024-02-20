function hasJSDocInheritDocTag(node) {
            return getJSDocTags(node).some((tag) => tag.tagName.text === "inheritDoc" || tag.tagName.text === "inheritdoc");
        }
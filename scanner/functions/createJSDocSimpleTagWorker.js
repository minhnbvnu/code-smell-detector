function createJSDocSimpleTagWorker(kind, tagName, comment) {
                const node = createBaseJSDocTag(kind, tagName != null ? tagName : createIdentifier(getDefaultTagNameForKind(kind)), comment);
                return node;
            }
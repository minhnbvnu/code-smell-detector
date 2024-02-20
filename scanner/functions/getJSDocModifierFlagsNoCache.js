function getJSDocModifierFlagsNoCache(node) {
            let flags = 0 /* None */;
            if (!!node.parent && !isParameter(node)) {
                if (isInJSFile(node)) {
                    if (getJSDocPublicTagNoCache(node))
                        flags |= 4 /* Public */;
                    if (getJSDocPrivateTagNoCache(node))
                        flags |= 8 /* Private */;
                    if (getJSDocProtectedTagNoCache(node))
                        flags |= 16 /* Protected */;
                    if (getJSDocReadonlyTagNoCache(node))
                        flags |= 64 /* Readonly */;
                    if (getJSDocOverrideTagNoCache(node))
                        flags |= 16384 /* Override */;
                }
                if (getJSDocDeprecatedTagNoCache(node))
                    flags |= 8192 /* Deprecated */;
            }
            return flags;
        }
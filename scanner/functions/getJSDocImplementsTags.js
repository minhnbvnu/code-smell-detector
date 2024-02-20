function getJSDocImplementsTags(node) {
            return getAllJSDocTags(node, isJSDocImplementsTag);
        }
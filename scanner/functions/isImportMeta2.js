function isImportMeta2(node) {
            return isMetaProperty(node) && node.keywordToken === 100 /* ImportKeyword */ && node.name.escapedText === "meta";
        }
function isImportMeta(n) {
            return isMetaProperty(n) && n.keywordToken === 100 /* ImportKeyword */ && n.name.escapedText === "meta";
        }
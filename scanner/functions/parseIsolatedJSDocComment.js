function parseIsolatedJSDocComment(content, start, length2) {
            const result = Parser.JSDocParser.parseIsolatedJSDocComment(content, start, length2);
            if (result && result.jsDoc) {
                Parser.fixupParentReferences(result.jsDoc);
            }
            return result;
        }
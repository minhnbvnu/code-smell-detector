function isStringDoubleQuoted(str, sourceFile) {
            return getSourceTextOfNodeFromSourceFile(sourceFile, str).charCodeAt(0) === 34 /* doubleQuote */;
        }
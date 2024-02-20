function quickParse(logger, scopeStartAST, sourceText, minChar, limChar, errorCapture) {
        var fragment = sourceText.getText(minChar, limChar);
        logger.log("Quick parse range (" + minChar + "," + limChar + "): \"" + TypeScript.stringToLiteral(fragment, 100) + "\"");
        var quickParser = new Parser();
        quickParser.setErrorRecovery(null);
        quickParser.errorCallback = errorCapture;
        var quickClassDecl = new TypeScript.ClassDeclaration(null, null, null, null);
        quickParser.currentClassDecl = quickClassDecl;
        var result = quickParser.quickParse(new TypeScript.StringSourceText(fragment), "", 0);
        return result;
    }
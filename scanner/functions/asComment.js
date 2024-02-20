function asComment(ctx) {
        return "/* line " + ctx.debugInfo.lineNumber + ", " + ctx.debugInfo.fileName + " */\n";
    }
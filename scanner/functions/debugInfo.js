function debugInfo(context, ctx, lineSeparator) {
        var result = '';
        if (context.dumpLineNumbers && !context.compress) {
            switch (context.dumpLineNumbers) {
                case 'comments':
                    result = asComment(ctx);
                    break;
                case 'mediaquery':
                    result = asMediaQuery(ctx);
                    break;
                case 'all':
                    result = asComment(ctx) + (lineSeparator || '') + asMediaQuery(ctx);
                    break;
            }
        }
        return result;
    }
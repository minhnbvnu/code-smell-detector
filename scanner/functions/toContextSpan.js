function toContextSpan(textSpan, sourceFile, context) {
            if (!context)
                return void 0;
            const contextSpan = isContextWithStartAndEndNode(context) ? getTextSpan(context.start, sourceFile, context.end) : getTextSpan(context, sourceFile);
            return contextSpan.start !== textSpan.start || contextSpan.length !== textSpan.length ? { contextSpan } : void 0;
        }
function isNextTokenNotCloseBracket(context) {
            return context.nextTokenSpan.kind !== 23 /* CloseBracketToken */;
        }
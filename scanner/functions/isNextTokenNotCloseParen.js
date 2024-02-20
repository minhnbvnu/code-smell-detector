function isNextTokenNotCloseParen(context) {
            return context.nextTokenSpan.kind !== 21 /* CloseParenToken */;
        }
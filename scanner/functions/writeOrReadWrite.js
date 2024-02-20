function writeOrReadWrite() {
                return parent2.parent && walkUpParenthesizedExpressions(parent2.parent).kind === 241 /* ExpressionStatement */ ? 1 /* Write */ : 2 /* ReadWrite */;
            }
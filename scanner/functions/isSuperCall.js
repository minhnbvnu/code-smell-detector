function isSuperCall(n) {
            return n.kind === 210 /* CallExpression */ && n.expression.kind === 106 /* SuperKeyword */;
        }
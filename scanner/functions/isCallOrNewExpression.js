function isCallOrNewExpression(node) {
            return node.kind === 210 /* CallExpression */ || node.kind === 211 /* NewExpression */;
        }
function isSpreadArgument(arg) {
                return !!arg && (arg.kind === 227 /* SpreadElement */ || arg.kind === 234 /* SyntheticExpression */ && arg.isSpread);
            }
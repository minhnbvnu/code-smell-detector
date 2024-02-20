function findSymbolFromAlias(alias, context) {
        var symbol = null;
        switch(alias.nodeType) {
            case TypeScript.NodeType.Name: {
                var name = (alias).text;
                var isDynamic = TypeScript.isQuoted(name);
                var findSym = function (id) {
                    if(context.members) {
                        return context.members.lookup(name);
                    } else {
                        return findTypeSymbolInScopeChain(name, context.topLevelScope);
                    }
                };
                if(isDynamic) {
                    symbol = context.tcContext.checker.findSymbolForDynamicModule(name, context.tcContext.script.locationInfo.filename, findSym);
                } else {
                    symbol = findSym(name);
                }
                break;

            }
            case TypeScript.NodeType.Dot: {
                var dottedExpr = alias;
                var op1Sym = findSymbolFromAlias(dottedExpr.operand1, context);
                if(op1Sym && op1Sym.getType()) {
                    symbol = findSymbolFromAlias(dottedExpr.operand2, context);
                }
                break;

            }
            default: {
                break;

            }
        }
        if(symbol) {
            var symType = symbol.getType();
            if(symType) {
                var members = symType.members;
                if(members) {
                    context.members = members.publicMembers;
                }
            }
        }
        return symbol;
    }
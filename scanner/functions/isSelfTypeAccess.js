function isSelfTypeAccess(name, parent2) {
                return name.kind === 108 /* ThisKeyword */ || !!parent2 && isEntityNameExpression(name) && parent2 === getResolvedSymbol(getFirstIdentifier(name));
            }
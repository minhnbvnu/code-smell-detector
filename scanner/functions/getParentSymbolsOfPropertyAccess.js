function getParentSymbolsOfPropertyAccess(location, symbol, checker) {
                        const propertyAccessExpression = isRightSideOfPropertyAccess(location) ? location.parent : void 0;
                        const lhsType = propertyAccessExpression && checker.getTypeAtLocation(propertyAccessExpression.expression);
                        const res = mapDefined(lhsType && (lhsType.isUnionOrIntersection() ? lhsType.types : lhsType.symbol === symbol.parent ? void 0 : [lhsType]), (t) => t.symbol && t.symbol.flags & (32 /* Class */ | 64 /* Interface */) ? t.symbol : void 0);
                        return res.length === 0 ? void 0 : res;
                    }
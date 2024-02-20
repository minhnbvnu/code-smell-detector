function isConstTypeVariable(type) {
                var _a2;
                return !!(type.flags & 262144 /* TypeParameter */ && some((_a2 = type.symbol) == null ? void 0 : _a2.declarations, (d) => hasSyntacticModifier(d, 2048 /* Const */)) || isGenericTupleType(type) && findIndex(getTypeArguments(type), (t, i) => !!(type.target.elementFlags[i] & 8 /* Variadic */) && isConstTypeVariable(t)) >= 0 || type.flags & 8388608 /* IndexedAccess */ && isConstTypeVariable(type.objectType));
            }
function getTypeParameterModifiers(tp) {
                var _a2;
                return reduceLeft((_a2 = tp.symbol) == null ? void 0 : _a2.declarations, (modifiers, d) => modifiers | getEffectiveModifierFlags(d), 0 /* None */) & (32768 /* In */ | 65536 /* Out */ | 2048 /* Const */);
            }
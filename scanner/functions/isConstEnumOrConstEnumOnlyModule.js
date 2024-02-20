function isConstEnumOrConstEnumOnlyModule(s) {
                return isConstEnumSymbol(s) || !!s.constEnumOnlyModule;
            }
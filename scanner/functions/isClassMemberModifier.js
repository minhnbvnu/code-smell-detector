function isClassMemberModifier(idToken) {
            return isParameterPropertyModifier(idToken) || idToken === 124 /* StaticKeyword */ || idToken === 161 /* OverrideKeyword */ || idToken === 127 /* AccessorKeyword */;
        }
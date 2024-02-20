function getTypeOfPropertyOrIndexSignature(type, name) {
                var _a2;
                return getTypeOfPropertyOfType(type, name) || ((_a2 = getApplicableIndexInfoForName(type, name)) == null ? void 0 : _a2.type) || unknownType;
            }
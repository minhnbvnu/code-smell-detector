function trySubstituteReservedName(name) {
                const token = identifierToKeywordKind(name);
                if (token !== void 0 && token >= 81 /* FirstReservedWord */ && token <= 116 /* LastReservedWord */) {
                    return setTextRange(factory2.createStringLiteralFromNode(name), name);
                }
                return void 0;
            }
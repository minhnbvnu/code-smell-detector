function createHoistedVariableForPrivateName(name, suffix) {
                var _a2;
                const text = tryGetTextOfPropertyName(name);
                return createHoistedVariableForClass((_a2 = text == null ? void 0 : text.substring(1)) != null ? _a2 : name, name, suffix);
            }
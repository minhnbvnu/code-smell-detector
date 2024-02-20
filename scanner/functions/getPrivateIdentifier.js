function getPrivateIdentifier(privateEnv, name) {
            var _a2, _b;
            return isGeneratedPrivateIdentifier(name) ? (_a2 = privateEnv == null ? void 0 : privateEnv.generatedIdentifiers) == null ? void 0 : _a2.get(getNodeForGeneratedName(name)) : (_b = privateEnv == null ? void 0 : privateEnv.identifiers) == null ? void 0 : _b.get(name.escapedText);
        }
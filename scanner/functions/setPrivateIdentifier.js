function setPrivateIdentifier(privateEnv, name, entry) {
            var _a2, _b;
            if (isGeneratedPrivateIdentifier(name)) {
                (_a2 = privateEnv.generatedIdentifiers) != null ? _a2 : privateEnv.generatedIdentifiers = /* @__PURE__ */ new Map();
                privateEnv.generatedIdentifiers.set(getNodeForGeneratedName(name), entry);
            }
            else {
                (_b = privateEnv.identifiers) != null ? _b : privateEnv.identifiers = /* @__PURE__ */ new Map();
                privateEnv.identifiers.set(name.escapedText, entry);
            }
        }
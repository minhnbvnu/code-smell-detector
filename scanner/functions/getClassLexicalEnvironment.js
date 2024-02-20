function getClassLexicalEnvironment() {
                var _a2;
                Debug.assert(lexicalEnvironment);
                return (_a2 = lexicalEnvironment.data) != null ? _a2 : lexicalEnvironment.data = {
                    facts: 0 /* None */,
                    classConstructor: void 0,
                    classThis: void 0,
                    superClassReference: void 0
                    // privateIdentifierEnvironment: undefined,
                };
            }
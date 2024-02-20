function getPrivateIdentifierEnvironment() {
                var _a2;
                Debug.assert(lexicalEnvironment);
                return (_a2 = lexicalEnvironment.privateEnv) != null ? _a2 : lexicalEnvironment.privateEnv = newPrivateEnvironment({
                    className: void 0,
                    weakSetName: void 0
                });
            }
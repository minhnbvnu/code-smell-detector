function shouldTransformAutoAccessorsInCurrentClass() {
                return shouldTransformAutoAccessors === -1 /* True */ || shouldTransformAutoAccessors === 3 /* Maybe */ && !!(lexicalEnvironment == null ? void 0 : lexicalEnvironment.data) && !!(lexicalEnvironment.data.facts & 16 /* WillHoistInitializersToConstructor */);
            }
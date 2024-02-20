function isReferenceToGlobalFunction(calleeName) {
                const ref = context
                    .getScope()
                    .references.find(ref => ref.identifier.name === calleeName);
                // ensure it's the "global" version
                return !(ref === null || ref === void 0 ? void 0 : ref.resolved) || ref.resolved.defs.length === 0;
            }
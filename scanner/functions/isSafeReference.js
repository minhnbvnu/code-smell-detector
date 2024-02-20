function isSafeReference(upperRef) {
            var _a;
            const id = upperRef.identifier;
            return (!upperRef.isWrite() ||
                (((_a = variable === null || variable === void 0 ? void 0 : variable.scope) === null || _a === void 0 ? void 0 : _a.variableScope) === upperRef.from.variableScope &&
                    id.range[0] < border));
        }
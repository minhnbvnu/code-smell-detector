function createType(flags) {
                var _a2;
                const result = new Type27(checker, flags);
                typeCount++;
                result.id = typeCount;
                (_a2 = tracing) == null ? void 0 : _a2.recordType(result);
                return result;
            }
function findSourceFile(fileName, isDefaultLib, ignoreNoDefaultLib, reason, packageId) {
                var _a3, _b2;
                (_a3 = tracing) == null ? void 0 : _a3.push(tracing.Phase.Program, "findSourceFile", {
                    fileName,
                    isDefaultLib: isDefaultLib || void 0,
                    fileIncludeKind: FileIncludeKind[reason.kind]
                });
                const result = findSourceFileWorker(fileName, isDefaultLib, ignoreNoDefaultLib, reason, packageId);
                (_b2 = tracing) == null ? void 0 : _b2.pop();
                return result;
            }
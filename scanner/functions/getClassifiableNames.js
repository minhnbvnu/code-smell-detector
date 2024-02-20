function getClassifiableNames() {
                var _a3;
                if (!classifiableNames) {
                    getTypeChecker();
                    classifiableNames = /* @__PURE__ */ new Set();
                    for (const sourceFile of files) {
                        (_a3 = sourceFile.classifiableNames) == null ? void 0 : _a3.forEach((value) => classifiableNames.add(value));
                    }
                }
                return classifiableNames;
            }
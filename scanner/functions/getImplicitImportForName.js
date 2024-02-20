function getImplicitImportForName(name) {
                var _a2, _b;
                const importSource = name === "createElement" ? currentFileState.importSpecifier : getJSXRuntimeImport(currentFileState.importSpecifier, compilerOptions);
                const existing = (_b = (_a2 = currentFileState.utilizedImplicitRuntimeImports) == null ? void 0 : _a2.get(importSource)) == null ? void 0 : _b.get(name);
                if (existing) {
                    return existing.name;
                }
                if (!currentFileState.utilizedImplicitRuntimeImports) {
                    currentFileState.utilizedImplicitRuntimeImports = /* @__PURE__ */ new Map();
                }
                let specifierSourceImports = currentFileState.utilizedImplicitRuntimeImports.get(importSource);
                if (!specifierSourceImports) {
                    specifierSourceImports = /* @__PURE__ */ new Map();
                    currentFileState.utilizedImplicitRuntimeImports.set(importSource, specifierSourceImports);
                }
                const generatedName = factory2.createUniqueName(`_${name}`, 16 /* Optimistic */ | 32 /* FileLevel */ | 64 /* AllowNameSubstitution */);
                const specifier = factory2.createImportSpecifier(
                /*isTypeOnly*/
                false, factory2.createIdentifier(name), generatedName);
                setIdentifierGeneratedImportReference(generatedName, specifier);
                specifierSourceImports.set(name, specifier);
                return generatedName;
            }
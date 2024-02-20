function collectDependencyGroups(externalImports) {
                const groupIndices = /* @__PURE__ */ new Map();
                const dependencyGroups = [];
                for (const externalImport of externalImports) {
                    const externalModuleName = getExternalModuleNameLiteral(factory2, externalImport, currentSourceFile, host, resolver, compilerOptions);
                    if (externalModuleName) {
                        const text = externalModuleName.text;
                        const groupIndex = groupIndices.get(text);
                        if (groupIndex !== void 0) {
                            dependencyGroups[groupIndex].externalImports.push(externalImport);
                        }
                        else {
                            groupIndices.set(text, dependencyGroups.length);
                            dependencyGroups.push({
                                name: externalModuleName,
                                externalImports: [externalImport]
                            });
                        }
                    }
                }
                return dependencyGroups;
            }
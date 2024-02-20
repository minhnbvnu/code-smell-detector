function emitTripleSlashDirectives(hasNoDefaultLib, files, types, libs2) {
                if (hasNoDefaultLib) {
                    const pos = writer.getTextPos();
                    writeComment(`/// <reference no-default-lib="true"/>`);
                    if (bundleFileInfo)
                        bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: "no-default-lib" /* NoDefaultLib */ });
                    writeLine();
                }
                if (currentSourceFile && currentSourceFile.moduleName) {
                    writeComment(`/// <amd-module name="${currentSourceFile.moduleName}" />`);
                    writeLine();
                }
                if (currentSourceFile && currentSourceFile.amdDependencies) {
                    for (const dep of currentSourceFile.amdDependencies) {
                        if (dep.name) {
                            writeComment(`/// <amd-dependency name="${dep.name}" path="${dep.path}" />`);
                        }
                        else {
                            writeComment(`/// <amd-dependency path="${dep.path}" />`);
                        }
                        writeLine();
                    }
                }
                for (const directive of files) {
                    const pos = writer.getTextPos();
                    writeComment(`/// <reference path="${directive.fileName}" />`);
                    if (bundleFileInfo)
                        bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: "reference" /* Reference */, data: directive.fileName });
                    writeLine();
                }
                for (const directive of types) {
                    const pos = writer.getTextPos();
                    const resolutionMode = directive.resolutionMode && directive.resolutionMode !== (currentSourceFile == null ? void 0 : currentSourceFile.impliedNodeFormat) ? `resolution-mode="${directive.resolutionMode === 99 /* ESNext */ ? "import" : "require"}"` : "";
                    writeComment(`/// <reference types="${directive.fileName}" ${resolutionMode}/>`);
                    if (bundleFileInfo)
                        bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: !directive.resolutionMode ? "type" /* Type */ : directive.resolutionMode === 99 /* ESNext */ ? "type-import" /* TypeResolutionModeImport */ : "type-require" /* TypeResolutionModeRequire */, data: directive.fileName });
                    writeLine();
                }
                for (const directive of libs2) {
                    const pos = writer.getTextPos();
                    writeComment(`/// <reference lib="${directive.fileName}" />`);
                    if (bundleFileInfo)
                        bundleFileInfo.sections.push({ pos, end: writer.getTextPos(), kind: "lib" /* Lib */, data: directive.fileName });
                    writeLine();
                }
            }
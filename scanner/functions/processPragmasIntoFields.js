function processPragmasIntoFields(context, reportDiagnostic) {
            context.checkJsDirective = void 0;
            context.referencedFiles = [];
            context.typeReferenceDirectives = [];
            context.libReferenceDirectives = [];
            context.amdDependencies = [];
            context.hasNoDefaultLib = false;
            context.pragmas.forEach((entryOrList, key) => {
                switch (key) {
                    case "reference": {
                        const referencedFiles = context.referencedFiles;
                        const typeReferenceDirectives = context.typeReferenceDirectives;
                        const libReferenceDirectives = context.libReferenceDirectives;
                        forEach(toArray(entryOrList), (arg) => {
                            const { types, lib, path, ["resolution-mode"]: res } = arg.arguments;
                            if (arg.arguments["no-default-lib"]) {
                                context.hasNoDefaultLib = true;
                            }
                            else if (types) {
                                const parsed = parseResolutionMode(res, types.pos, types.end, reportDiagnostic);
                                typeReferenceDirectives.push({ pos: types.pos, end: types.end, fileName: types.value, ...parsed ? { resolutionMode: parsed } : {} });
                            }
                            else if (lib) {
                                libReferenceDirectives.push({ pos: lib.pos, end: lib.end, fileName: lib.value });
                            }
                            else if (path) {
                                referencedFiles.push({ pos: path.pos, end: path.end, fileName: path.value });
                            }
                            else {
                                reportDiagnostic(arg.range.pos, arg.range.end - arg.range.pos, Diagnostics.Invalid_reference_directive_syntax);
                            }
                        });
                        break;
                    }
                    case "amd-dependency": {
                        context.amdDependencies = map(toArray(entryOrList), (x) => ({ name: x.arguments.name, path: x.arguments.path }));
                        break;
                    }
                    case "amd-module": {
                        if (entryOrList instanceof Array) {
                            for (const entry of entryOrList) {
                                if (context.moduleName) {
                                    reportDiagnostic(entry.range.pos, entry.range.end - entry.range.pos, Diagnostics.An_AMD_module_cannot_have_multiple_name_assignments);
                                }
                                context.moduleName = entry.arguments.name;
                            }
                        }
                        else {
                            context.moduleName = entryOrList.arguments.name;
                        }
                        break;
                    }
                    case "ts-nocheck":
                    case "ts-check": {
                        forEach(toArray(entryOrList), (entry) => {
                            if (!context.checkJsDirective || entry.range.pos > context.checkJsDirective.pos) {
                                context.checkJsDirective = {
                                    enabled: key === "ts-check",
                                    end: entry.range.end,
                                    pos: entry.range.pos
                                };
                            }
                        });
                        break;
                    }
                    case "jsx":
                    case "jsxfrag":
                    case "jsximportsource":
                    case "jsxruntime":
                        return;
                    default:
                        Debug.fail("Unhandled pragma kind");
                }
            });
        }
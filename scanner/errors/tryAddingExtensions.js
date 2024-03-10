function tryAddingExtensions(candidate, extensions, originalExtension, onlyRecordFailures, state) {
            if (!onlyRecordFailures) {
                const directory = getDirectoryPath(candidate);
                if (directory) {
                    onlyRecordFailures = !directoryProbablyExists(directory, state.host);
                }
            }
            switch (originalExtension) {
                case ".mjs" /* Mjs */:
                case ".mts" /* Mts */:
                case ".d.mts" /* Dmts */:
                    return extensions & 1 /* TypeScript */ && tryExtension(".mts" /* Mts */, originalExtension === ".mts" /* Mts */ || originalExtension === ".d.mts" /* Dmts */) || extensions & 4 /* Declaration */ && tryExtension(".d.mts" /* Dmts */, originalExtension === ".mts" /* Mts */ || originalExtension === ".d.mts" /* Dmts */) || extensions & 2 /* JavaScript */ && tryExtension(".mjs" /* Mjs */) || void 0;
                case ".cjs" /* Cjs */:
                case ".cts" /* Cts */:
                case ".d.cts" /* Dcts */:
                    return extensions & 1 /* TypeScript */ && tryExtension(".cts" /* Cts */, originalExtension === ".cts" /* Cts */ || originalExtension === ".d.cts" /* Dcts */) || extensions & 4 /* Declaration */ && tryExtension(".d.cts" /* Dcts */, originalExtension === ".cts" /* Cts */ || originalExtension === ".d.cts" /* Dcts */) || extensions & 2 /* JavaScript */ && tryExtension(".cjs" /* Cjs */) || void 0;
                case ".json" /* Json */:
                    return extensions & 4 /* Declaration */ && tryExtension(".d.json.ts") || extensions & 8 /* Json */ && tryExtension(".json" /* Json */) || void 0;
                case ".tsx" /* Tsx */:
                case ".jsx" /* Jsx */:
                    return extensions & 1 /* TypeScript */ && (tryExtension(".tsx" /* Tsx */, originalExtension === ".tsx" /* Tsx */) || tryExtension(".ts" /* Ts */, originalExtension === ".tsx" /* Tsx */)) || extensions & 4 /* Declaration */ && tryExtension(".d.ts" /* Dts */, originalExtension === ".tsx" /* Tsx */) || extensions & 2 /* JavaScript */ && (tryExtension(".jsx" /* Jsx */) || tryExtension(".js" /* Js */)) || void 0;
                case ".ts" /* Ts */:
                case ".d.ts" /* Dts */:
                case ".js" /* Js */:
                case "":
                    return extensions & 1 /* TypeScript */ && (tryExtension(".ts" /* Ts */, originalExtension === ".ts" /* Ts */ || originalExtension === ".d.ts" /* Dts */) || tryExtension(".tsx" /* Tsx */, originalExtension === ".ts" /* Ts */ || originalExtension === ".d.ts" /* Dts */)) || extensions & 4 /* Declaration */ && tryExtension(".d.ts" /* Dts */, originalExtension === ".ts" /* Ts */ || originalExtension === ".d.ts" /* Dts */) || extensions & 2 /* JavaScript */ && (tryExtension(".js" /* Js */) || tryExtension(".jsx" /* Jsx */)) || state.isConfigLookup && tryExtension(".json" /* Json */) || void 0;
                default:
                    return extensions & 4 /* Declaration */ && !isDeclarationFileName(candidate + originalExtension) && tryExtension(`.d${originalExtension}.ts`) || void 0;
            }
            function tryExtension(ext, resolvedUsingTsExtension) {
                const path = tryFile(candidate + ext, onlyRecordFailures, state);
                return path === void 0 ? void 0 : { path, ext, resolvedUsingTsExtension: !state.candidateIsFromPackageJsonField && resolvedUsingTsExtension };
            }
        }
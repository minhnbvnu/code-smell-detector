function kindModifiersFromExtension(extension) {
            switch (extension) {
                case ".d.ts" /* Dts */:
                    return ".d.ts" /* dtsModifier */;
                case ".js" /* Js */:
                    return ".js" /* jsModifier */;
                case ".json" /* Json */:
                    return ".json" /* jsonModifier */;
                case ".jsx" /* Jsx */:
                    return ".jsx" /* jsxModifier */;
                case ".ts" /* Ts */:
                    return ".ts" /* tsModifier */;
                case ".tsx" /* Tsx */:
                    return ".tsx" /* tsxModifier */;
                case ".d.mts" /* Dmts */:
                    return ".d.mts" /* dmtsModifier */;
                case ".mjs" /* Mjs */:
                    return ".mjs" /* mjsModifier */;
                case ".mts" /* Mts */:
                    return ".mts" /* mtsModifier */;
                case ".d.cts" /* Dcts */:
                    return ".d.cts" /* dctsModifier */;
                case ".cjs" /* Cjs */:
                    return ".cjs" /* cjsModifier */;
                case ".cts" /* Cts */:
                    return ".cts" /* ctsModifier */;
                case ".tsbuildinfo" /* TsBuildInfo */:
                    return Debug.fail(`Extension ${".tsbuildinfo" /* TsBuildInfo */} is unsupported.`);
                case void 0:
                    return "" /* none */;
                default:
                    return Debug.assertNever(extension);
            }
        }
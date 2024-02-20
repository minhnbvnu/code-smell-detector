function tryGetJSExtensionForFile(fileName, options) {
            const ext = tryGetExtensionFromPath2(fileName);
            switch (ext) {
                case ".ts" /* Ts */:
                case ".d.ts" /* Dts */:
                    return ".js" /* Js */;
                case ".tsx" /* Tsx */:
                    return options.jsx === 1 /* Preserve */ ? ".jsx" /* Jsx */ : ".js" /* Js */;
                case ".js" /* Js */:
                case ".jsx" /* Jsx */:
                case ".json" /* Json */:
                    return ext;
                case ".d.mts" /* Dmts */:
                case ".mts" /* Mts */:
                case ".mjs" /* Mjs */:
                    return ".mjs" /* Mjs */;
                case ".d.cts" /* Dcts */:
                case ".cts" /* Cts */:
                case ".cjs" /* Cjs */:
                    return ".cjs" /* Cjs */;
                default:
                    return void 0;
            }
        }
function getScriptKindFromFileName(fileName) {
            const ext = fileName.substr(fileName.lastIndexOf("."));
            switch (ext.toLowerCase()) {
                case ".js" /* Js */:
                case ".cjs" /* Cjs */:
                case ".mjs" /* Mjs */:
                    return 1 /* JS */;
                case ".jsx" /* Jsx */:
                    return 2 /* JSX */;
                case ".ts" /* Ts */:
                case ".cts" /* Cts */:
                case ".mts" /* Mts */:
                    return 3 /* TS */;
                case ".tsx" /* Tsx */:
                    return 4 /* TSX */;
                case ".json" /* Json */:
                    return 6 /* JSON */;
                default:
                    return 0 /* Unknown */;
            }
        }
function extensionIsTS(ext) {
            return ext === ".ts" /* Ts */ || ext === ".tsx" /* Tsx */ || ext === ".d.ts" /* Dts */ || ext === ".cts" /* Cts */ || ext === ".mts" /* Mts */ || ext === ".d.mts" /* Dmts */ || ext === ".d.cts" /* Dcts */ || startsWith(ext, ".d.") && endsWith(ext, ".ts");
        }
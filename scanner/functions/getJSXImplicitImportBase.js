function getJSXImplicitImportBase(compilerOptions, file) {
            const jsxImportSourcePragmas = file == null ? void 0 : file.pragmas.get("jsximportsource");
            const jsxImportSourcePragma = isArray(jsxImportSourcePragmas) ? jsxImportSourcePragmas[jsxImportSourcePragmas.length - 1] : jsxImportSourcePragmas;
            return compilerOptions.jsx === 4 /* ReactJSX */ || compilerOptions.jsx === 5 /* ReactJSXDev */ || compilerOptions.jsxImportSource || jsxImportSourcePragma ? (jsxImportSourcePragma == null ? void 0 : jsxImportSourcePragma.arguments.factory) || compilerOptions.jsxImportSource || "react" : void 0;
        }
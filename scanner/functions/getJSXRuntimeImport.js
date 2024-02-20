function getJSXRuntimeImport(base, options) {
            return base ? `${base}/${options.jsx === 5 /* ReactJSXDev */ ? "jsx-dev-runtime" : "jsx-runtime"}` : void 0;
        }
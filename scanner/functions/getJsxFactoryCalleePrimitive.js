function getJsxFactoryCalleePrimitive(isStaticChildren) {
                return compilerOptions.jsx === 5 /* ReactJSXDev */ ? "jsxDEV" : isStaticChildren ? "jsxs" : "jsx";
            }
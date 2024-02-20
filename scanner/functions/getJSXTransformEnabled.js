function getJSXTransformEnabled(options) {
            const jsx = options.jsx;
            return jsx === 2 /* React */ || jsx === 4 /* ReactJSX */ || jsx === 5 /* ReactJSXDev */;
        }
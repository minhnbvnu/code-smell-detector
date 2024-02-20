function getJsxStatelessElementTypeAt(location) {
                const jsxElementType = getJsxElementTypeAt(location);
                if (jsxElementType) {
                    return getUnionType([jsxElementType, nullType]);
                }
            }
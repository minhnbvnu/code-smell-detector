function isJSXNumber(fullNumberNode) {
                return fullNumberNode.parent.type.indexOf("JSX") === 0;
            }
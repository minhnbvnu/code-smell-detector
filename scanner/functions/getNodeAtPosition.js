function getNodeAtPosition(sourceFile, position) {
                    let current = sourceFile;
                    const getContainingChild = (child) => {
                        if (child.pos <= position && (position < child.end || position === child.end && child.kind === 1 /* EndOfFileToken */)) {
                            return child;
                        }
                    };
                    while (true) {
                        const child = isJavaScriptFile && hasJSDocNodes(current) && forEach(current.jsDoc, getContainingChild) || forEachChild(current, getContainingChild);
                        if (!child) {
                            return current;
                        }
                        current = child;
                    }
                }
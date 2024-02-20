function filterOutSameLineVars(node) {
                return node.declarations.reduce((finalCollection, elem) => {
                    const lastElem = finalCollection[finalCollection.length - 1];
                    if ((elem.loc.start.line !== node.loc.start.line && !lastElem) ||
                        (lastElem && lastElem.loc.start.line !== elem.loc.start.line)) {
                        finalCollection.push(elem);
                    }
                    return finalCollection;
                }, []);
            }
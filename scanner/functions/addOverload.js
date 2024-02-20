function addOverload(signature, key, containingNode) {
                key = key !== null && key !== void 0 ? key : getOverloadKey(signature);
                if (currentScope &&
                    (containingNode || signature).parent === currentScope.parent) {
                    const overloads = currentScope.overloads.get(key);
                    if (overloads !== undefined) {
                        overloads.push(signature);
                    }
                    else {
                        currentScope.overloads.set(key, [signature]);
                    }
                }
            }
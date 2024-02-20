function addClassStaticThisReferences(referenceLocation, search, state) {
                        addReference(referenceLocation, search.symbol, state);
                        const classLike = referenceLocation.parent;
                        if (state.options.use === 2 /* Rename */ || !isClassLike(classLike))
                            return;
                        Debug.assert(classLike.name === referenceLocation);
                        const addRef = state.referenceAdder(search.symbol);
                        for (const member of classLike.members) {
                            if (!(isMethodOrAccessor(member) && isStatic(member))) {
                                continue;
                            }
                            if (member.body) {
                                member.body.forEachChild(function cb(node) {
                                    if (node.kind === 108 /* ThisKeyword */) {
                                        addRef(node);
                                    }
                                    else if (!isFunctionLike(node) && !isClassLike(node)) {
                                        node.forEachChild(cb);
                                    }
                                });
                            }
                        }
                    }
function getCanonicalOverload(overloads, implementation) {
                    const implementationSharesContainerWithFirstOverload = implementation !== void 0 && implementation.parent === overloads[0].parent;
                    return implementationSharesContainerWithFirstOverload ? implementation : overloads[0];
                }
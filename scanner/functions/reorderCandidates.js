function reorderCandidates(signatures, result, callChainFlags) {
                let lastParent;
                let lastSymbol;
                let cutoffIndex = 0;
                let index;
                let specializedIndex = -1;
                let spliceIndex;
                Debug.assert(!result.length);
                for (const signature of signatures) {
                    const symbol = signature.declaration && getSymbolOfDeclaration(signature.declaration);
                    const parent2 = signature.declaration && signature.declaration.parent;
                    if (!lastSymbol || symbol === lastSymbol) {
                        if (lastParent && parent2 === lastParent) {
                            index = index + 1;
                        }
                        else {
                            lastParent = parent2;
                            index = cutoffIndex;
                        }
                    }
                    else {
                        index = cutoffIndex = result.length;
                        lastParent = parent2;
                    }
                    lastSymbol = symbol;
                    if (signatureHasLiteralTypes(signature)) {
                        specializedIndex++;
                        spliceIndex = specializedIndex;
                        cutoffIndex++;
                    }
                    else {
                        spliceIndex = index;
                    }
                    result.splice(spliceIndex, 0, callChainFlags ? getOptionalCallSignature(signature, callChainFlags) : signature);
                }
            }
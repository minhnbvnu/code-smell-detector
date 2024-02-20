function inferStructuralType(usage) {
                const members = /* @__PURE__ */ new Map();
                if (usage.properties) {
                    usage.properties.forEach((u, name) => {
                        const symbol = checker.createSymbol(4 /* Property */, name);
                        symbol.links.type = combineFromUsage(u);
                        members.set(name, symbol);
                    });
                }
                const callSignatures = usage.calls ? [getSignatureFromCalls(usage.calls)] : [];
                const constructSignatures = usage.constructs ? [getSignatureFromCalls(usage.constructs)] : [];
                const indexInfos = usage.stringIndex ? [checker.createIndexInfo(checker.getStringType(), combineFromUsage(usage.stringIndex), 
                    /*isReadonly*/
                    false)] : [];
                return checker.createAnonymousType(
                /*symbol*/
                void 0, members, callSignatures, constructSignatures, indexInfos);
            }
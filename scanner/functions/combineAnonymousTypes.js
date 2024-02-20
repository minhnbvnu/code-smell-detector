function combineAnonymousTypes(anons) {
                if (anons.length === 1) {
                    return anons[0];
                }
                const calls = [];
                const constructs = [];
                const stringIndices = [];
                const numberIndices = [];
                let stringIndexReadonly = false;
                let numberIndexReadonly = false;
                const props = createMultiMap();
                for (const anon2 of anons) {
                    for (const p of checker.getPropertiesOfType(anon2)) {
                        props.add(p.name, p.valueDeclaration ? checker.getTypeOfSymbolAtLocation(p, p.valueDeclaration) : checker.getAnyType());
                    }
                    calls.push(...checker.getSignaturesOfType(anon2, 0 /* Call */));
                    constructs.push(...checker.getSignaturesOfType(anon2, 1 /* Construct */));
                    const stringIndexInfo = checker.getIndexInfoOfType(anon2, 0 /* String */);
                    if (stringIndexInfo) {
                        stringIndices.push(stringIndexInfo.type);
                        stringIndexReadonly = stringIndexReadonly || stringIndexInfo.isReadonly;
                    }
                    const numberIndexInfo = checker.getIndexInfoOfType(anon2, 1 /* Number */);
                    if (numberIndexInfo) {
                        numberIndices.push(numberIndexInfo.type);
                        numberIndexReadonly = numberIndexReadonly || numberIndexInfo.isReadonly;
                    }
                }
                const members = mapEntries(props, (name, types) => {
                    const isOptional = types.length < anons.length ? 16777216 /* Optional */ : 0;
                    const s = checker.createSymbol(4 /* Property */ | isOptional, name);
                    s.links.type = checker.getUnionType(types);
                    return [name, s];
                });
                const indexInfos = [];
                if (stringIndices.length)
                    indexInfos.push(checker.createIndexInfo(checker.getStringType(), checker.getUnionType(stringIndices), stringIndexReadonly));
                if (numberIndices.length)
                    indexInfos.push(checker.createIndexInfo(checker.getNumberType(), checker.getUnionType(numberIndices), numberIndexReadonly));
                return checker.createAnonymousType(anons[0].symbol, members, calls, constructs, indexInfos);
            }
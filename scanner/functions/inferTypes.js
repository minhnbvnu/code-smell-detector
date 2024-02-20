function inferTypes(usage) {
                var _a2, _b, _c;
                const types = [];
                if (usage.isNumber) {
                    types.push(checker.getNumberType());
                }
                if (usage.isString) {
                    types.push(checker.getStringType());
                }
                if (usage.isNumberOrString) {
                    types.push(checker.getUnionType([checker.getStringType(), checker.getNumberType()]));
                }
                if (usage.numberIndex) {
                    types.push(checker.createArrayType(combineFromUsage(usage.numberIndex)));
                }
                if (((_a2 = usage.properties) == null ? void 0 : _a2.size) || ((_b = usage.constructs) == null ? void 0 : _b.length) || usage.stringIndex) {
                    types.push(inferStructuralType(usage));
                }
                const candidateTypes = (usage.candidateTypes || []).map((t) => checker.getBaseTypeOfLiteralType(t));
                const callsType = ((_c = usage.calls) == null ? void 0 : _c.length) ? inferStructuralType(usage) : void 0;
                if (callsType && candidateTypes) {
                    types.push(checker.getUnionType([callsType, ...candidateTypes], 2 /* Subtype */));
                }
                else {
                    if (callsType) {
                        types.push(callsType);
                    }
                    if (length(candidateTypes)) {
                        types.push(...candidateTypes);
                    }
                }
                types.push(...inferNamedTypesFromProperties(usage));
                return types;
            }
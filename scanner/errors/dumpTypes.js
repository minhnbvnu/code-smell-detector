function dumpTypes(types) {
                        var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
                        mark("beginDumpTypes");
                        const typesPath = legend[legend.length - 1].typesPath;
                        const typesFd = fs.openSync(typesPath, "w");
                        const recursionIdentityMap = /* @__PURE__ */ new Map();
                        fs.writeSync(typesFd, "[");
                        const numTypes = types.length;
                        for (let i = 0; i < numTypes; i++) {
                            const type = types[i];
                            const objectFlags = type.objectFlags;
                            const symbol = (_a2 = type.aliasSymbol) != null ? _a2 : type.symbol;
                            let display;
                            if (objectFlags & 16 /* Anonymous */ | type.flags & 2944 /* Literal */) {
                                try {
                                    display = (_b = type.checker) == null ? void 0 : _b.typeToString(type);
                                }
                                catch (e) {
                                    display = void 0;
                                }
                            }
                            let indexedAccessProperties = {};
                            if (type.flags & 8388608 /* IndexedAccess */) {
                                const indexedAccessType = type;
                                indexedAccessProperties = {
                                    indexedAccessObjectType: (_c = indexedAccessType.objectType) == null ? void 0 : _c.id,
                                    indexedAccessIndexType: (_d = indexedAccessType.indexType) == null ? void 0 : _d.id
                                };
                            }
                            let referenceProperties = {};
                            if (objectFlags & 4 /* Reference */) {
                                const referenceType = type;
                                referenceProperties = {
                                    instantiatedType: (_e = referenceType.target) == null ? void 0 : _e.id,
                                    typeArguments: (_f = referenceType.resolvedTypeArguments) == null ? void 0 : _f.map((t) => t.id),
                                    referenceLocation: getLocation(referenceType.node)
                                };
                            }
                            let conditionalProperties = {};
                            if (type.flags & 16777216 /* Conditional */) {
                                const conditionalType = type;
                                conditionalProperties = {
                                    conditionalCheckType: (_g = conditionalType.checkType) == null ? void 0 : _g.id,
                                    conditionalExtendsType: (_h = conditionalType.extendsType) == null ? void 0 : _h.id,
                                    conditionalTrueType: (_j = (_i = conditionalType.resolvedTrueType) == null ? void 0 : _i.id) != null ? _j : -1,
                                    conditionalFalseType: (_l = (_k = conditionalType.resolvedFalseType) == null ? void 0 : _k.id) != null ? _l : -1
                                };
                            }
                            let substitutionProperties = {};
                            if (type.flags & 33554432 /* Substitution */) {
                                const substitutionType = type;
                                substitutionProperties = {
                                    substitutionBaseType: (_m = substitutionType.baseType) == null ? void 0 : _m.id,
                                    constraintType: (_n = substitutionType.constraint) == null ? void 0 : _n.id
                                };
                            }
                            let reverseMappedProperties = {};
                            if (objectFlags & 1024 /* ReverseMapped */) {
                                const reverseMappedType = type;
                                reverseMappedProperties = {
                                    reverseMappedSourceType: (_o = reverseMappedType.source) == null ? void 0 : _o.id,
                                    reverseMappedMappedType: (_p = reverseMappedType.mappedType) == null ? void 0 : _p.id,
                                    reverseMappedConstraintType: (_q = reverseMappedType.constraintType) == null ? void 0 : _q.id
                                };
                            }
                            let evolvingArrayProperties = {};
                            if (objectFlags & 256 /* EvolvingArray */) {
                                const evolvingArrayType = type;
                                evolvingArrayProperties = {
                                    evolvingArrayElementType: evolvingArrayType.elementType.id,
                                    evolvingArrayFinalType: (_r = evolvingArrayType.finalArrayType) == null ? void 0 : _r.id
                                };
                            }
                            let recursionToken;
                            const recursionIdentity = type.checker.getRecursionIdentity(type);
                            if (recursionIdentity) {
                                recursionToken = recursionIdentityMap.get(recursionIdentity);
                                if (!recursionToken) {
                                    recursionToken = recursionIdentityMap.size;
                                    recursionIdentityMap.set(recursionIdentity, recursionToken);
                                }
                            }
                            const descriptor = {
                                id: type.id,
                                intrinsicName: type.intrinsicName,
                                symbolName: (symbol == null ? void 0 : symbol.escapedName) && unescapeLeadingUnderscores(symbol.escapedName),
                                recursionId: recursionToken,
                                isTuple: objectFlags & 8 /* Tuple */ ? true : void 0,
                                unionTypes: type.flags & 1048576 /* Union */ ? (_s = type.types) == null ? void 0 : _s.map((t) => t.id) : void 0,
                                intersectionTypes: type.flags & 2097152 /* Intersection */ ? type.types.map((t) => t.id) : void 0,
                                aliasTypeArguments: (_t = type.aliasTypeArguments) == null ? void 0 : _t.map((t) => t.id),
                                keyofType: type.flags & 4194304 /* Index */ ? (_u = type.type) == null ? void 0 : _u.id : void 0,
                                ...indexedAccessProperties,
                                ...referenceProperties,
                                ...conditionalProperties,
                                ...substitutionProperties,
                                ...reverseMappedProperties,
                                ...evolvingArrayProperties,
                                destructuringPattern: getLocation(type.pattern),
                                firstDeclaration: getLocation((_v = symbol == null ? void 0 : symbol.declarations) == null ? void 0 : _v[0]),
                                flags: Debug.formatTypeFlags(type.flags).split("|"),
                                display
                            };
                            fs.writeSync(typesFd, JSON.stringify(descriptor));
                            if (i < numTypes - 1) {
                                fs.writeSync(typesFd, ",\n");
                            }
                        }
                        fs.writeSync(typesFd, "]\n");
                        fs.closeSync(typesFd);
                        mark("endDumpTypes");
                        measure("Dump types", "beginDumpTypes", "endDumpTypes");
                    }
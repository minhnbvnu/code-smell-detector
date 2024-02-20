function getSpreadType(left, right, symbol, objectFlags, readonly) {
                if (left.flags & 1 /* Any */ || right.flags & 1 /* Any */) {
                    return anyType;
                }
                if (left.flags & 2 /* Unknown */ || right.flags & 2 /* Unknown */) {
                    return unknownType;
                }
                if (left.flags & 131072 /* Never */) {
                    return right;
                }
                if (right.flags & 131072 /* Never */) {
                    return left;
                }
                left = tryMergeUnionOfObjectTypeAndEmptyObject(left, readonly);
                if (left.flags & 1048576 /* Union */) {
                    return checkCrossProductUnion([left, right]) ? mapType(left, (t) => getSpreadType(t, right, symbol, objectFlags, readonly)) : errorType;
                }
                right = tryMergeUnionOfObjectTypeAndEmptyObject(right, readonly);
                if (right.flags & 1048576 /* Union */) {
                    return checkCrossProductUnion([left, right]) ? mapType(right, (t) => getSpreadType(left, t, symbol, objectFlags, readonly)) : errorType;
                }
                if (right.flags & (528 /* BooleanLike */ | 296 /* NumberLike */ | 2112 /* BigIntLike */ | 402653316 /* StringLike */ | 1056 /* EnumLike */ | 67108864 /* NonPrimitive */ | 4194304 /* Index */)) {
                    return left;
                }
                if (isGenericObjectType(left) || isGenericObjectType(right)) {
                    if (isEmptyObjectType(left)) {
                        return right;
                    }
                    if (left.flags & 2097152 /* Intersection */) {
                        const types = left.types;
                        const lastLeft = types[types.length - 1];
                        if (isNonGenericObjectType(lastLeft) && isNonGenericObjectType(right)) {
                            return getIntersectionType(concatenate(types.slice(0, types.length - 1), [getSpreadType(lastLeft, right, symbol, objectFlags, readonly)]));
                        }
                    }
                    return getIntersectionType([left, right]);
                }
                const members = createSymbolTable();
                const skippedPrivateMembers = /* @__PURE__ */ new Set();
                const indexInfos = left === emptyObjectType ? getIndexInfosOfType(right) : getUnionIndexInfos([left, right]);
                for (const rightProp of getPropertiesOfType(right)) {
                    if (getDeclarationModifierFlagsFromSymbol(rightProp) & (8 /* Private */ | 16 /* Protected */)) {
                        skippedPrivateMembers.add(rightProp.escapedName);
                    }
                    else if (isSpreadableProperty(rightProp)) {
                        members.set(rightProp.escapedName, getSpreadSymbol(rightProp, readonly));
                    }
                }
                for (const leftProp of getPropertiesOfType(left)) {
                    if (skippedPrivateMembers.has(leftProp.escapedName) || !isSpreadableProperty(leftProp)) {
                        continue;
                    }
                    if (members.has(leftProp.escapedName)) {
                        const rightProp = members.get(leftProp.escapedName);
                        const rightType = getTypeOfSymbol(rightProp);
                        if (rightProp.flags & 16777216 /* Optional */) {
                            const declarations = concatenate(leftProp.declarations, rightProp.declarations);
                            const flags = 4 /* Property */ | leftProp.flags & 16777216 /* Optional */;
                            const result = createSymbol(flags, leftProp.escapedName);
                            result.links.type = getUnionType([getTypeOfSymbol(leftProp), removeMissingOrUndefinedType(rightType)], 2 /* Subtype */);
                            result.links.leftSpread = leftProp;
                            result.links.rightSpread = rightProp;
                            result.declarations = declarations;
                            result.links.nameType = getSymbolLinks(leftProp).nameType;
                            members.set(leftProp.escapedName, result);
                        }
                    }
                    else {
                        members.set(leftProp.escapedName, getSpreadSymbol(leftProp, readonly));
                    }
                }
                const spread = createAnonymousType(symbol, members, emptyArray, emptyArray, sameMap(indexInfos, (info) => getIndexInfoWithReadonly(info, readonly)));
                spread.objectFlags |= 128 /* ObjectLiteral */ | 131072 /* ContainsObjectOrArrayLiteral */ | 2097152 /* ContainsSpread */ | objectFlags;
                return spread;
            }
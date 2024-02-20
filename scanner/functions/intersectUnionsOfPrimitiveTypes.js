function intersectUnionsOfPrimitiveTypes(types) {
                let unionTypes2;
                const index = findIndex(types, (t) => !!(getObjectFlags(t) & 32768 /* PrimitiveUnion */));
                if (index < 0) {
                    return false;
                }
                let i = index + 1;
                while (i < types.length) {
                    const t = types[i];
                    if (getObjectFlags(t) & 32768 /* PrimitiveUnion */) {
                        (unionTypes2 || (unionTypes2 = [types[index]])).push(t);
                        orderedRemoveItemAt(types, i);
                    }
                    else {
                        i++;
                    }
                }
                if (!unionTypes2) {
                    return false;
                }
                const checked = [];
                const result = [];
                for (const u of unionTypes2) {
                    for (const t of u.types) {
                        if (insertType(checked, t)) {
                            if (eachUnionContains(unionTypes2, t)) {
                                insertType(result, t);
                            }
                        }
                    }
                }
                types[index] = getUnionTypeFromSortedList(result, 32768 /* PrimitiveUnion */);
                return true;
            }
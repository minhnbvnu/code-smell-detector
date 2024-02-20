function getCrossProductIntersections(types) {
                const count = getCrossProductUnionSize(types);
                const intersections = [];
                for (let i = 0; i < count; i++) {
                    const constituents = types.slice();
                    let n = i;
                    for (let j = types.length - 1; j >= 0; j--) {
                        if (types[j].flags & 1048576 /* Union */) {
                            const sourceTypes = types[j].types;
                            const length2 = sourceTypes.length;
                            constituents[j] = sourceTypes[n % length2];
                            n = Math.floor(n / length2);
                        }
                    }
                    const t = getIntersectionType(constituents);
                    if (!(t.flags & 131072 /* Never */))
                        intersections.push(t);
                }
                return intersections;
            }
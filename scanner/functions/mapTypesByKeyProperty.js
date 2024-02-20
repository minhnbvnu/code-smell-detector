function mapTypesByKeyProperty(types, name) {
                const map2 = /* @__PURE__ */ new Map();
                let count = 0;
                for (const type of types) {
                    if (type.flags & (524288 /* Object */ | 2097152 /* Intersection */ | 58982400 /* InstantiableNonPrimitive */)) {
                        const discriminant = getTypeOfPropertyOfType(type, name);
                        if (discriminant) {
                            if (!isLiteralType(discriminant)) {
                                return void 0;
                            }
                            let duplicate = false;
                            forEachType(discriminant, (t) => {
                                const id = getTypeId(getRegularTypeOfLiteralType(t));
                                const existing = map2.get(id);
                                if (!existing) {
                                    map2.set(id, type);
                                }
                                else if (existing !== unknownType) {
                                    map2.set(id, unknownType);
                                    duplicate = true;
                                }
                            });
                            if (!duplicate)
                                count++;
                        }
                    }
                }
                return count >= 10 && count * 2 >= types.length ? map2 : void 0;
            }
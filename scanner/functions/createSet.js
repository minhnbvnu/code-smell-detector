function createSet(getHashCode, equals) {
            const multiMap = /* @__PURE__ */ new Map();
            let size = 0;
            function* getElementIterator() {
                for (const value of multiMap.values()) {
                    if (isArray(value)) {
                        yield* value;
                    }
                    else {
                        yield value;
                    }
                }
            }
            const set = {
                has(element) {
                    const hash = getHashCode(element);
                    if (!multiMap.has(hash))
                        return false;
                    const candidates = multiMap.get(hash);
                    if (!isArray(candidates))
                        return equals(candidates, element);
                    for (const candidate of candidates) {
                        if (equals(candidate, element)) {
                            return true;
                        }
                    }
                    return false;
                },
                add(element) {
                    const hash = getHashCode(element);
                    if (multiMap.has(hash)) {
                        const values = multiMap.get(hash);
                        if (isArray(values)) {
                            if (!contains(values, element, equals)) {
                                values.push(element);
                                size++;
                            }
                        }
                        else {
                            const value = values;
                            if (!equals(value, element)) {
                                multiMap.set(hash, [value, element]);
                                size++;
                            }
                        }
                    }
                    else {
                        multiMap.set(hash, element);
                        size++;
                    }
                    return this;
                },
                delete(element) {
                    const hash = getHashCode(element);
                    if (!multiMap.has(hash))
                        return false;
                    const candidates = multiMap.get(hash);
                    if (isArray(candidates)) {
                        for (let i = 0; i < candidates.length; i++) {
                            if (equals(candidates[i], element)) {
                                if (candidates.length === 1) {
                                    multiMap.delete(hash);
                                }
                                else if (candidates.length === 2) {
                                    multiMap.set(hash, candidates[1 - i]);
                                }
                                else {
                                    unorderedRemoveItemAt(candidates, i);
                                }
                                size--;
                                return true;
                            }
                        }
                    }
                    else {
                        const candidate = candidates;
                        if (equals(candidate, element)) {
                            multiMap.delete(hash);
                            size--;
                            return true;
                        }
                    }
                    return false;
                },
                clear() {
                    multiMap.clear();
                    size = 0;
                },
                get size() {
                    return size;
                },
                forEach(action) {
                    for (const elements of arrayFrom(multiMap.values())) {
                        if (isArray(elements)) {
                            for (const element of elements) {
                                action(element, element, set);
                            }
                        }
                        else {
                            const element = elements;
                            action(element, element, set);
                        }
                    }
                },
                keys() {
                    return getElementIterator();
                },
                values() {
                    return getElementIterator();
                },
                *entries() {
                    for (const value of getElementIterator()) {
                        yield [value, value];
                    }
                },
                [Symbol.iterator]: () => {
                    return getElementIterator();
                },
                [Symbol.toStringTag]: multiMap[Symbol.toStringTag]
            };
            return set;
        }
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
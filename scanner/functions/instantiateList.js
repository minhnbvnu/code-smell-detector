function instantiateList(items, mapper, instantiator) {
                if (items && items.length) {
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        const mapped = instantiator(item, mapper);
                        if (item !== mapped) {
                            const result = i === 0 ? [] : items.slice(0, i);
                            result.push(mapped);
                            for (i++; i < items.length; i++) {
                                result.push(instantiator(items[i], mapper));
                            }
                            return result;
                        }
                    }
                }
                return items;
            }
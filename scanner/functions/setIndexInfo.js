function setIndexInfo (index) {
                if (indexKey === undefined) {
                    return;
                }
                paramMap[index.__currentName] = /** @type {string} */ (
                    Key.encode(indexKey, index.multiEntry)
                );
            }
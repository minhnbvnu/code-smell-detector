function getEmptyTableSlot() {
                if (freeTableIndexes.length) {
                    return freeTableIndexes.pop()
                }
                try {
                    wasmTable.grow(1)
                } catch (err) {
                    if (!(err instanceof RangeError)) {
                        throw err
                    }
                    throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
                }
                return wasmTable.length - 1
            }
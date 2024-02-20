function enumerateInsertsAndDeletes(newItems, oldItems, comparer, inserted, deleted, unchanged) {
            unchanged = unchanged || noop;
            let newIndex = 0;
            let oldIndex = 0;
            const newLen = newItems.length;
            const oldLen = oldItems.length;
            let hasChanges = false;
            while (newIndex < newLen && oldIndex < oldLen) {
                const newItem = newItems[newIndex];
                const oldItem = oldItems[oldIndex];
                const compareResult = comparer(newItem, oldItem);
                if (compareResult === -1 /* LessThan */) {
                    inserted(newItem);
                    newIndex++;
                    hasChanges = true;
                }
                else if (compareResult === 1 /* GreaterThan */) {
                    deleted(oldItem);
                    oldIndex++;
                    hasChanges = true;
                }
                else {
                    unchanged(oldItem, newItem);
                    newIndex++;
                    oldIndex++;
                }
            }
            while (newIndex < newLen) {
                inserted(newItems[newIndex++]);
                hasChanges = true;
            }
            while (oldIndex < oldLen) {
                deleted(oldItems[oldIndex++]);
                hasChanges = true;
            }
            return hasChanges;
        }
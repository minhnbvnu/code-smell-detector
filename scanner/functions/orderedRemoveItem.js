function orderedRemoveItem(array, item) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] === item) {
                    orderedRemoveItemAt(array, i);
                    return true;
                }
            }
            return false;
        }
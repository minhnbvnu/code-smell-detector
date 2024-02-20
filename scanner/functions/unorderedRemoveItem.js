function unorderedRemoveItem(array, item) {
            return unorderedRemoveFirstItemWhere(array, (element) => element === item);
        }
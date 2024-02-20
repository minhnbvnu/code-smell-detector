function orderedRemoveItemAt(array, index) {
            for (let i = index; i < array.length - 1; i++) {
                array[i] = array[i + 1];
            }
            array.pop();
        }
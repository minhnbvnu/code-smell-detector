function unorderedRemoveItemAt(array, index) {
            array[index] = array[array.length - 1];
            array.pop();
        }
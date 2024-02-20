function remove_by(array, key) {
        for (let i = 0; i < array.length;) {
            if (key(array[i]))
                array.splice(i, 1);
            else
                i++;
        }
    }
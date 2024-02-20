function sorted_index(array, value) {
        let low = 0;
        let high = array.length;
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (array[mid] < value)
                low = mid + 1;
            else
                high = mid;
        }
        return low;
    }
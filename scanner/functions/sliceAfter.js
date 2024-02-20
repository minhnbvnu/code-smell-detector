function sliceAfter(arr, value) {
            const index = arr.indexOf(value);
            Debug.assert(index !== -1);
            return arr.slice(index);
        }
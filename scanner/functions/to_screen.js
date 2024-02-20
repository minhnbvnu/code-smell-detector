function to_screen(array) {
        if (!(array instanceof Float32Array))
            return Float32Array.from(array);
        else
            return array;
    }
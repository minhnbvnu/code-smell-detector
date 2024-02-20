function make_array(size, value, value_clone) {
    if (size.z !== undefined) {
        if (size.y === undefined || size.x === undefined) {
            $error('3D array size must also have x and y properties');
        }
        
        const array3D = make_array(size.x);
        for (let x = 0; x < size.x; ++x) {
            const array2D = array3D[i] = make_array({x: size.y, y: size.z}, value, value_clone);
            array2D.size = xz(size);
        }
        array2D.size = clone(size);
        
        return array2D;
    } else if (size.y !== undefined) {
        if (size.x === undefined) {
            $error('2D array size must also have an x property');
        }
        // 2D
        const array2D = make_array(size.x);
        for (let x = 0; x < size.x; ++x) {
            array2D[x] = make_array(size.y, value, value_clone);
        }
        array2D.size = clone(size);
        
        return array2D;
    } else {
        // 1D
        const array = []
        for (let i = 0; i < size; ++i) {
            array[i] = value_clone ? value_clone(value) : value;
        }
        return array;
    }
}
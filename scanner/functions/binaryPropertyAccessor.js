function binaryPropertyAccessor(buffer, batchLength, byteOffset, componentType, type) {
    if (!buffer) {
        throw new Error('Buffer is mandatory to parse binary property.');
    }
    if (typeof batchLength === 'undefined' || batchLength === null) {
        throw new Error('batchLength is mandatory to parse binary property.');
    }
    if (typeof byteOffset === 'undefined' || byteOffset === null) {
        throw new Error('byteOffset is mandatory to parse binary property.');
    }
    if (!componentTypeBytesSize[componentType]) {
        throw new Error(`Uknown component type: ${componentType}. Cannot access binary property.`);
    }
    if (!typeComponentsNumber[type]) {
        throw new Error(`Uknown type: ${type}. Cannot access binary property.`);
    }

    const typeNb = typeComponentsNumber[type];
    const elementsNb = batchLength * typeNb; // Number of elements to parse in the buffer

    const typedArray = new componentTypeConstructor[componentType](buffer, byteOffset, elementsNb);

    if (type === 'SCALAR') {
        return Array.from(typedArray);
    } else {
        // return an array of threejs vectors, depending on type (see typeConstructor)
        const array = [];
        // iteration step of 2, 3 or 4, depending on the type (VEC2, VEC3 or VEC4)
        for (let i = 0; i <= typedArray.length - typeNb; i += typeNb) {
            const vector = new typeConstructor[type]();
            // Create a vector from an array, starting at the offset i and takes the right number of elements depending
            // on its type (Vector2, Vector3, Vector 4)
            vector.fromArray(typedArray, i);
            array.push(vector);
        }
        return array;
    }
}
function encode_NDArray(array, serializer) {
        const encoded = serializer.encode(array.dtype == "object" ? Array.from(array) : array.buffer);
        return {
            type: "ndarray",
            array: encoded,
            order: platform_1.BYTE_ORDER,
            dtype: array.dtype,
            shape: array.shape,
        };
    }
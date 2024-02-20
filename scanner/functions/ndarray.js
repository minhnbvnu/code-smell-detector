function ndarray(init, { dtype, shape } = {}) {
        if (dtype == null) {
            dtype = (() => {
                switch (true) {
                    case init instanceof Uint8Array: return "uint8";
                    case init instanceof Int8Array: return "int8";
                    case init instanceof Uint16Array: return "uint16";
                    case init instanceof Int16Array: return "int16";
                    case init instanceof Uint32Array: return "uint32";
                    case init instanceof Int32Array: return "int32";
                    case init instanceof Float32Array: return "float32";
                    case init instanceof ArrayBuffer:
                    case init instanceof Float64Array: return "float64";
                    default: return "object";
                }
            })();
        }
        switch (dtype) {
            case "bool": return new BoolNDArray(init, shape);
            case "uint8": return new Uint8NDArray(init, shape);
            case "int8": return new Int8NDArray(init, shape);
            case "uint16": return new Uint16NDArray(init, shape);
            case "int16": return new Int16NDArray(init, shape);
            case "uint32": return new Uint32NDArray(init, shape);
            case "int32": return new Int32NDArray(init, shape);
            case "float32": return new Float32NDArray(init, shape);
            case "float64": return new Float64NDArray(init, shape);
            case "object": return new ObjectNDArray(init, shape);
        }
    }
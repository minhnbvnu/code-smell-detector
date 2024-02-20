function isES2015OrLaterIterable(n) {
                switch (n) {
                    case "Float32Array":
                    case "Float64Array":
                    case "Int16Array":
                    case "Int32Array":
                    case "Int8Array":
                    case "NodeList":
                    case "Uint16Array":
                    case "Uint32Array":
                    case "Uint8Array":
                    case "Uint8ClampedArray":
                        return true;
                }
                return false;
            }
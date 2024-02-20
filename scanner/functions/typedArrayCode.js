function typedArrayCode(data) {
            return arrayTypes[Object.prototype.toString.call(data)] | 0;
        }
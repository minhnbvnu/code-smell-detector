function typedArrayCode$1(data) {
            return arrayTypes[Object.prototype.toString.call(data)] | 0;
        }
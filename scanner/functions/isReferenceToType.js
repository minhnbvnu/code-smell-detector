function isReferenceToType(type, target) {
            return (getObjectFlags(type) & 4 /* Reference */) !== 0 && type.target === target;
        }
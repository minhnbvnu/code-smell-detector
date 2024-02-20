function isReferenceToType2(type, target) {
                return type !== void 0 && target !== void 0 && (getObjectFlags(type) & 4 /* Reference */) !== 0 && type.target === target;
            }
function ensureInt8(value){if(typeof value==="object"){var offset=ensureCache.alloc(value,HEAP8);ensureCache.copy(value,HEAP8,offset);return offset}return value}
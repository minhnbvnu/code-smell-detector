function isInternalName(node) {
            return (getEmitFlags(node) & 65536 /* InternalName */) !== 0;
        }
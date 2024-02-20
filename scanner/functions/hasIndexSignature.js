function hasIndexSignature(type) {
            return !!type.getStringIndexType() || !!type.getNumberIndexType();
        }
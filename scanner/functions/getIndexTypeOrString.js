function getIndexTypeOrString(type) {
                const indexType = getExtractStringType(getIndexType(type));
                return indexType.flags & 131072 /* Never */ ? stringType : indexType;
            }
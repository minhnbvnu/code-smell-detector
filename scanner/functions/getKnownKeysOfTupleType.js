function getKnownKeysOfTupleType(type) {
                return getUnionType(append(arrayOf(type.target.fixedLength, (i) => getStringLiteralType("" + i)), getIndexType(type.target.readonly ? globalReadonlyArrayType : globalArrayType)));
            }
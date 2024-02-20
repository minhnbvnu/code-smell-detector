function getRestTypeOfTupleType(type) {
                return getElementTypeOfSliceOfTupleType(type, type.target.fixedLength);
            }
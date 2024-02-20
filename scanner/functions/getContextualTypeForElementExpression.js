function getContextualTypeForElementExpression(arrayContextualType, index) {
                return arrayContextualType && (index >= 0 && getTypeOfPropertyOfContextualType(arrayContextualType, "" + index) || mapType(arrayContextualType, (t) => isTupleType(t) ? getElementTypeOfSliceOfTupleType(t, 0, 
                /*endSkipCount*/
                0, 
                /*writing*/
                false, 
                /*noReductions*/
                true) : getIteratedTypeOrElementType(1 /* Element */, t, undefinedType, 
                /*errorNode*/
                void 0, 
                /*checkAssignability*/
                false), 
                /*noReductions*/
                true));
            }
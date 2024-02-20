function getGlobalTypedPropertyDescriptorType() {
                return deferredGlobalTypedPropertyDescriptorType || (deferredGlobalTypedPropertyDescriptorType = getGlobalType("TypedPropertyDescriptor", 
                /*arity*/
                1, 
                /*reportErrors*/
                true) || emptyGenericType);
            }
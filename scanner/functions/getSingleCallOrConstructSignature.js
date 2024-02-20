function getSingleCallOrConstructSignature(type) {
                return getSingleSignature(type, 0 /* Call */, 
                /*allowMembers*/
                false) || getSingleSignature(type, 1 /* Construct */, 
                /*allowMembers*/
                false);
            }
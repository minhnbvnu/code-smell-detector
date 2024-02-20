function getSingleCallSignature(type) {
                return getSingleSignature(type, 0 /* Call */, 
                /*allowMembers*/
                false);
            }
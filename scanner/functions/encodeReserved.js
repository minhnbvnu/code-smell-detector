function encodeReserved(val) {
        //return encodeURI(val).replace(SELECTEDCHARS_RE, function(s) {return escape(s)} );
        return encodeURI(val); // no need for additional replace if selected-chars is empty
    }
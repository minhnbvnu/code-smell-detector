function encodeNormal(val) {
        return encodeURIComponent(val).replace(RESERVEDCHARS_RE, function(s) {return escape(s);} );
    }
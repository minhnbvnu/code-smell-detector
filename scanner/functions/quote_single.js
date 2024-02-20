function quote_single() {
                    return "'" + str.replace(/\x27/g, "\\'") + "'";
                }
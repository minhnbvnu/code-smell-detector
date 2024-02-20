function quote_double() {
                    return '"' + str.replace(/\x22/g, '\\"') + '"';
                }
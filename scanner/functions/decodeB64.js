function decodeB64(str) {
            if (typeof atob !== 'undefined') {
                return atob(str);
            }
            return 'base64:' + str;
        }
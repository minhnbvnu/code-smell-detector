function uuid4() {
        // from ipython project
        // http://www.ietf.org/rfc/rfc4122.txt
        const s = new Array(32);
        const hex_digits = "0123456789ABCDEF";
        for (let i = 0; i < 32; i++) {
            s[i] = hex_digits[Math.floor(Math.random() * 0x10)];
        }
        s[12] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[16] = hex_digits[(s[16].charCodeAt(0) & 0x3) | 0x8]; // bits 6-7 of the clock_seq_hi_and_reserved to 01
        return s.join("");
    }
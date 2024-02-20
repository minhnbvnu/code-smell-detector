function functionName(str) {
        
        // Remove @ suffixes from post-2021 Safari
        if (str.endsWith('@')) { str = str.substring(0, str.length - 1); }

        str = str.trim();

        if (str === 'anonymous' || str === 'eval') { str = '?'; }
        if (str !== '' && str !== '?') { str += '()'; }
        
        return str;
    }
function numberOfDirectorySeparators(str) {
            const match = str.match(/\//g);
            return match ? match.length : 0;
        }
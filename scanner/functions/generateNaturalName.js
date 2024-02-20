function generateNaturalName() {
        var x = 1;
        var str = '';
        for(var i = 0; i < 2 || Math.random() < x; i++) {
            x *= 0.7;
            str += pickRandom(consonants);
            if(i === 0) {
                str = str.toUpperCase();
            }
            str += pickRandom(vowels);
        }
        return str;
    }
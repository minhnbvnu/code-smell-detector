function addZone (packed) {
        var i, name, split, normalized;

        if (typeof packed === "string") {
            packed = [packed];
        }

        for (i = 0; i < packed.length; i++) {
            split = packed[i].split('|');
            name = split[0];
            normalized = normalizeName(name);
            zones[normalized] = packed[i];
            names[normalized] = name;
            addToGuesses(normalized, split[2].split(' '));
        }
    }
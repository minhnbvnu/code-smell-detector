function generateNewFullName() {
        var name = generateNaturalName() + ' ';
            name += generateNaturalName() + ' the ';
            name += pickRandom(attributes) + ' ';
            name += pickRandom(titles) + ' of ';
            name += pickRandom(secondary);
        return name;
    }
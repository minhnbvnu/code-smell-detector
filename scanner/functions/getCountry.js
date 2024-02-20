function getCountry (name) {
        name = name.toUpperCase();
        return countries[name] || null;
    }
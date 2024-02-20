function addCountries (data) {
        var i, country_code, country_zones, split;
        if (!data || !data.length) return;
        for (i = 0; i < data.length; i++) {
            split = data[i].split('|');
            country_code = split[0].toUpperCase();
            country_zones = split[1].split(' ');
            countries[country_code] = new Country(
                country_code,
                country_zones
            );
        }
    }
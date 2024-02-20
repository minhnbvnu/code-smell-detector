function zonesForCountry(country, with_offset) {
        country = getCountry(country);

        if (!country) return null;

        var zones = country.zones.sort();

        if (with_offset) {
            return zones.map(function (zone_name) {
                var zone = getZone(zone_name);
                return {
                    name: zone_name,
                    offset: zone.utcOffset(new Date())
                };
            });
        }

        return zones;
    }
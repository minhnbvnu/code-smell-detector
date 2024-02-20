function filter_extensions(nbext_config) {
        var active = [];
        Object.keys(nbext_config).forEach(function (nbext) {
            if (nbext_config[nbext]) {active.push(nbext);}
        });
        return active;
    }
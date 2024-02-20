function assertNamePresent(name) {
        var englishName = _this.getEnglishName(name);
        assert(englishName && englishName.trim().length > 0,
               'No English ' + name + ' specified.');
    }
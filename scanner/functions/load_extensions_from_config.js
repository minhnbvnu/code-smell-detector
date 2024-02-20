function load_extensions_from_config(section) {
        return section.loaded.then(function() {
            if (section.data.load_extensions) {
                var active = filter_extensions(section.data.load_extensions);
                return load_extensions.apply(this, active);
            }
        }).catch(utils.reject('Could not load nbextensions from ' + section.section_name + ' config file'));
    }
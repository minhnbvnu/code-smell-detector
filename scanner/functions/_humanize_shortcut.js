function _humanize_shortcut(shortcut){
        var joinchar = '-';
        if (platform === 'MacOS'){
            joinchar = '';
        }
        return _.map(shortcut.split('-'), humanize_key ).join(joinchar);
    }
function _humanize_sequence(sequence){
        var joinchar = ',';
        var hum = _.map(sequence.replace(/meta/g, 'cmd').split(','), _humanize_shortcut).join(joinchar);
        return hum;
    }
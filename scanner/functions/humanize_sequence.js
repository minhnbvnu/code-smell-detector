function humanize_sequence(sequence){
        var joinchar = ',';
        var hum = _.map(sequence.replace(/meta/g, 'cmd').split(','), humanize_shortcut).join(joinchar);
        return hum;
    }
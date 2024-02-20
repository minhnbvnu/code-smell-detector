function formatSpec(spec)
    {
        if (spec.long != null && spec.short != null)
            return '--' + spec.long + ', ' + '-' + spec.short;
        else if (spec.long != null)
            return '--' + spec.long;
        else if (spec.short != null)
            return '-' + spec.short;
    }
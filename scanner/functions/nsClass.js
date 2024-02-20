function nsClass () {
        var strBldr = [], prx = ns;
        $.each(arguments, function () { strBldr.push(this == '' ? prx : prx + '-' + this); });
        return jQuery.trim(strBldr.join(' '));
    }
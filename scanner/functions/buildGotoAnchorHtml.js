function buildGotoAnchorHtml(allOptions, dateEnv, gotoOptions, attrs, innerHtml) {
        var date;
        var type;
        var forceOff;
        var finalOptions;
        if (gotoOptions instanceof Date) {
            date = gotoOptions; // a single date-like input
        }
        else {
            date = gotoOptions.date;
            type = gotoOptions.type;
            forceOff = gotoOptions.forceOff;
        }
        finalOptions = {
            date: dateEnv.formatIso(date, { omitTime: true }),
            type: type || 'day'
        };
        if (typeof attrs === 'string') {
            innerHtml = attrs;
            attrs = null;
        }
        attrs = attrs ? ' ' + attrsToStr(attrs) : ''; // will have a leading space
        innerHtml = innerHtml || '';
        if (!forceOff && allOptions.navLinks) {
            return '<a' + attrs +
                ' data-goto="' + htmlEscape(JSON.stringify(finalOptions)) + '">' +
                innerHtml +
                '</a>';
        }
        else {
            return '<span' + attrs + '>' +
                innerHtml +
                '</span>';
        }
    }
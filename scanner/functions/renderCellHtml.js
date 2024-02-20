function renderCellHtml(date, dateProfile, context, otherAttrs) {
        var dateEnv = context.dateEnv, theme = context.theme;
        var isDateValid = core.rangeContainsMarker(dateProfile.activeRange, date); // TODO: called too frequently. cache somehow.
        var classes = core.getDayClasses(date, dateProfile, context);
        classes.unshift('fc-day', theme.getClass('widgetContent'));
        return '<td class="' + classes.join(' ') + '"' +
            (isDateValid ?
                ' data-date="' + dateEnv.formatIso(date, { omitTime: true }) + '"' :
                '') +
            (otherAttrs ?
                ' ' + otherAttrs :
                '') +
            '></td>';
    }
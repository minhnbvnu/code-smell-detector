function renderDateCell(dateMarker, dateProfile, datesRepDistinctDays, colCnt, colHeadFormat, context, colspan, otherAttrs) {
        var dateEnv = context.dateEnv, theme = context.theme, options = context.options;
        var isDateValid = rangeContainsMarker(dateProfile.activeRange, dateMarker); // TODO: called too frequently. cache somehow.
        var classNames = [
            'fc-day-header',
            theme.getClass('widgetHeader')
        ];
        var innerHtml;
        if (typeof options.columnHeaderHtml === 'function') {
            innerHtml = options.columnHeaderHtml(dateEnv.toDate(dateMarker));
        }
        else if (typeof options.columnHeaderText === 'function') {
            innerHtml = htmlEscape(options.columnHeaderText(dateEnv.toDate(dateMarker)));
        }
        else {
            innerHtml = htmlEscape(dateEnv.format(dateMarker, colHeadFormat));
        }
        // if only one row of days, the classNames on the header can represent the specific days beneath
        if (datesRepDistinctDays) {
            classNames = classNames.concat(
            // includes the day-of-week class
            // noThemeHighlight=true (don't highlight the header)
            getDayClasses(dateMarker, dateProfile, context, true));
        }
        else {
            classNames.push('fc-' + DAY_IDS[dateMarker.getUTCDay()]); // only add the day-of-week class
        }
        return '' +
            '<th class="' + classNames.join(' ') + '"' +
            ((isDateValid && datesRepDistinctDays) ?
                ' data-date="' + dateEnv.formatIso(dateMarker, { omitTime: true }) + '"' :
                '') +
            (colspan > 1 ?
                ' colspan="' + colspan + '"' :
                '') +
            (otherAttrs ?
                ' ' + otherAttrs :
                '') +
            '>' +
            (isDateValid ?
                // don't make a link if the heading could represent multiple days, or if there's only one day (forceOff)
                buildGotoAnchorHtml(options, dateEnv, { date: dateMarker, forceOff: !datesRepDistinctDays || colCnt === 1 }, innerHtml) :
                // if not valid, display text, but no link
                innerHtml) +
            '</th>';
    }
function formatWeekNumber(num, weekLabel, locale, display) {
        var parts = [];
        if (display === 'narrow') {
            parts.push(weekLabel);
        }
        else if (display === 'short') {
            parts.push(weekLabel, ' ');
        }
        // otherwise, considered 'numeric'
        parts.push(locale.simpleNumberFormat.format(num));
        if (locale.options.isRtl) { // TODO: use control characters instead?
            parts.reverse();
        }
        return parts.join('');
    }
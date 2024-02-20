function timeAgoFuzzy(currentDate, comparisonDate) {
        var
            i = 0,
            l = timeparts.length,
            calc,
            result = null,
            interval = currentDate.getTime() - comparisonDate.getTime();
        while (i < l && result === null) {
            calc = Math.floor(interval / timeparts[i].div) % timeparts[i].mod;
            if (calc) {
                if(timeparts[i].name === 'sec' && calc < 5) {
                    result = 'just now';
                }
                else {
                    result = calc + ' ' + timeparts[i].name + (calc !== 1 ? 's' : '') + ' ago';
                }
            }
            i += 1;
        }

        if(result === null) {
            result = 'just now';
        }

        return result;
    }
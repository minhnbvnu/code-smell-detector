function buildDatePointApi(span, dateEnv) {
        return {
            date: dateEnv.toDate(span.range.start),
            dateStr: dateEnv.formatIso(span.range.start, { omitTime: span.allDay }),
            allDay: span.allDay
        };
    }
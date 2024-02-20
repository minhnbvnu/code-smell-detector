function actualize(entry, rule, year) {
            var actualized, date = rule.day[1];
            do {
                actualized = new Date(Date.UTC(year, rule.month, Math.abs(date++)));
            } while (rule.day[0] < 7 && actualized.getUTCDay() != rule.day[0]);
            actualized = {
                clock: rule.clock,
                sort: actualized.getTime(),
                rule: rule,
                save: rule.save * 6e4,
                offset: entry.offset
            };
            actualized[actualized.clock] = actualized.sort + rule.time * 6e4;
            if (actualized.posix) {
                actualized.wallclock = actualized[actualized.clock] + (entry.offset + rule.saved);
            }
            else {
                actualized.posix = actualized[actualized.clock] - (entry.offset + rule.saved);
            }
            return actualized;
        }
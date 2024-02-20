function parseRecurring(eventInput, allDayDefault, dateEnv, recurringTypes, leftovers) {
        for (var i = 0; i < recurringTypes.length; i++) {
            var localLeftovers = {};
            var parsed = recurringTypes[i].parse(eventInput, localLeftovers, dateEnv);
            if (parsed) {
                var allDay = localLeftovers.allDay;
                delete localLeftovers.allDay; // remove from leftovers
                if (allDay == null) {
                    allDay = allDayDefault;
                    if (allDay == null) {
                        allDay = parsed.allDayGuess;
                        if (allDay == null) {
                            allDay = false;
                        }
                    }
                }
                __assign(leftovers, localLeftovers);
                return {
                    allDay: allDay,
                    duration: parsed.duration,
                    typeData: parsed.typeData,
                    typeId: i
                };
            }
        }
        return null;
    }
function getWeekOfYear(/*Date*/dateObject, /*Number*/firstDayOfWeek, utc) {
            firstDayOfWeek = firstDayOfWeek || 0;
            var fullYear = dateObject[utc ? "getUTCFullYear" : "getFullYear"]();
            var firstDayOfYear = new Date(fullYear, 0, 1).getDay(),
                adj = (firstDayOfYear - firstDayOfWeek + 7) % 7,
                week = floor((getDayOfYear(dateObject) + adj - 1) / 7);

            // if year starts on the specified day, start counting weeks at 1
            if (firstDayOfYear === firstDayOfWeek) {
                week++;
            }

            return week; // Number
        }
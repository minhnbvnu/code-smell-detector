function getDayOfYear(/*Date*/dateObject, utc) {
            // summary: gets the day of the year as represented by dateObject
            return date.difference(new Date(dateObject.getFullYear(), 0, 1, dateObject.getHours()), dateObject, null, utc) + 1; // Number
        }
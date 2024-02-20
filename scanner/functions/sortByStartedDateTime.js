function sortByStartedDateTime(arr) {
            arr.sort(function(a, b) {
                var timeA = Lib.parseISO8601(a.startedDateTime);
                var timeB = Lib.parseISO8601(b.startedDateTime);
                return timeA - timeB;
            });
        }
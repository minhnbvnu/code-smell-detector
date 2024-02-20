function every2(s, pred, start = 0, end = s.length) {
            return everyInRange(start, end, (i) => pred(s.charCodeAt(i), i));
        }
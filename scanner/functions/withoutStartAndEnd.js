function withoutStartAndEnd(s, start, end) {
            return startsWith(s, start) && endsWith(s, end) ? s.slice(start.length, s.length - end.length) : void 0;
        }
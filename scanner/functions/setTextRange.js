function setTextRange(range, location) {
            return location ? setTextRangePosEnd(range, location.pos, location.end) : range;
        }
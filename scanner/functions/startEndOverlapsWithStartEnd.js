function startEndOverlapsWithStartEnd(start1, end1, start2, end2) {
            const start = Math.max(start1, start2);
            const end = Math.min(end1, end2);
            return start < end;
        }
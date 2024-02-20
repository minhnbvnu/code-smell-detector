function decodedTextSpanIntersectsWith(start1, length1, start2, length2) {
            const end1 = start1 + length1;
            const end2 = start2 + length2;
            return start2 <= end1 && end2 >= start1;
        }
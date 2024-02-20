function trimEndImpl(s) {
            let end = s.length - 1;
            while (end >= 0) {
                if (!isWhiteSpaceLike(s.charCodeAt(end)))
                    break;
                end--;
            }
            return s.slice(0, end + 1);
        }
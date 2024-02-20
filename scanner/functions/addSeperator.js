function addSeperator() {
            if (!qs.length) {
                if (includeQuestionMark) {
                    qs = qs + '?';
                }
            } else {
                qs = qs + '&';
            }
        }
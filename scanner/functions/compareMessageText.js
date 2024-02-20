function compareMessageText(t1, t2) {
            if (typeof t1 === "string" && typeof t2 === "string") {
                return compareStringsCaseSensitive(t1, t2);
            }
            else if (typeof t1 === "string") {
                return -1 /* LessThan */;
            }
            else if (typeof t2 === "string") {
                return 1 /* GreaterThan */;
            }
            let res = compareStringsCaseSensitive(t1.messageText, t2.messageText);
            if (res) {
                return res;
            }
            if (!t1.next && !t2.next) {
                return 0 /* EqualTo */;
            }
            if (!t1.next) {
                return -1 /* LessThan */;
            }
            if (!t2.next) {
                return 1 /* GreaterThan */;
            }
            const len = Math.min(t1.next.length, t2.next.length);
            for (let i = 0; i < len; i++) {
                res = compareMessageText(t1.next[i], t2.next[i]);
                if (res) {
                    return res;
                }
            }
            if (t1.next.length < t2.next.length) {
                return -1 /* LessThan */;
            }
            else if (t1.next.length > t2.next.length) {
                return 1 /* GreaterThan */;
            }
            return 0 /* EqualTo */;
        }
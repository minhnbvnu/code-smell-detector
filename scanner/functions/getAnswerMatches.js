function getAnswerMatches(a = '', b = '') {
                let c = 0;
                for (let i = 0; i < b.length; i++) {
                    if (a.indexOf(b.substr(i, 1)) != -1) {
                        c++;
                    }
                }
                return c;
            }
function levenshteinWithMax(s1, s2, max) {
            let previous = new Array(s2.length + 1);
            let current = new Array(s2.length + 1);
            const big = max + 0.01;
            for (let i = 0; i <= s2.length; i++) {
                previous[i] = i;
            }
            for (let i = 1; i <= s1.length; i++) {
                const c1 = s1.charCodeAt(i - 1);
                const minJ = Math.ceil(i > max ? i - max : 1);
                const maxJ = Math.floor(s2.length > max + i ? max + i : s2.length);
                current[0] = i;
                let colMin = i;
                for (let j = 1; j < minJ; j++) {
                    current[j] = big;
                }
                for (let j = minJ; j <= maxJ; j++) {
                    const substitutionDistance = s1[i - 1].toLowerCase() === s2[j - 1].toLowerCase() ? previous[j - 1] + 0.1 : previous[j - 1] + 2;
                    const dist = c1 === s2.charCodeAt(j - 1) ? previous[j - 1] : Math.min(
                    /*delete*/
                    previous[j] + 1, 
                    /*insert*/
                    current[j - 1] + 1, 
                    /*substitute*/
                    substitutionDistance);
                    current[j] = dist;
                    colMin = Math.min(colMin, dist);
                }
                for (let j = maxJ + 1; j <= s2.length; j++) {
                    current[j] = big;
                }
                if (colMin > max) {
                    return void 0;
                }
                const temp = previous;
                previous = current;
                current = temp;
            }
            const res = previous[s2.length];
            return res > max ? void 0 : res;
        }
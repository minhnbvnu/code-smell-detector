function diffHalfMatchI(longtext, shorttext, i) {
            var seed, j, bestCommon, prefixLength, suffixLength,
				bestLongtextA, bestLongtextB, bestShorttextA, bestShorttextB;
            // Start with a 1/4 length substring at position i as a seed.
            seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
            j = -1;
            bestCommon = "";
            while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {
                prefixLength = dmp.diffCommonPrefix(longtext.substring(i),
                    shorttext.substring(j));
                suffixLength = dmp.diffCommonSuffix(longtext.substring(0, i),
                    shorttext.substring(0, j));
                if (bestCommon.length < suffixLength + prefixLength) {
                    bestCommon = shorttext.substring(j - suffixLength, j) +
                        shorttext.substring(j, j + prefixLength);
                    bestLongtextA = longtext.substring(0, i - suffixLength);
                    bestLongtextB = longtext.substring(i + prefixLength);
                    bestShorttextA = shorttext.substring(0, j - suffixLength);
                    bestShorttextB = shorttext.substring(j + prefixLength);
                }
            }
            if (bestCommon.length * 2 >= longtext.length) {
                return [ bestLongtextA, bestLongtextB,
                    bestShorttextA, bestShorttextB, bestCommon
                ];
            } else {
                return null;
            }
        }
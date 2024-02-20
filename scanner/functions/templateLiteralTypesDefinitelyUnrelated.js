function templateLiteralTypesDefinitelyUnrelated(source, target) {
                const sourceStart = source.texts[0];
                const targetStart = target.texts[0];
                const sourceEnd = source.texts[source.texts.length - 1];
                const targetEnd = target.texts[target.texts.length - 1];
                const startLen = Math.min(sourceStart.length, targetStart.length);
                const endLen = Math.min(sourceEnd.length, targetEnd.length);
                return sourceStart.slice(0, startLen) !== targetStart.slice(0, startLen) || sourceEnd.slice(sourceEnd.length - endLen) !== targetEnd.slice(targetEnd.length - endLen);
            }
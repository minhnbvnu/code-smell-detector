function setLastNonTriviaPosition(s, force) {
                if (force || !isTrivia2(s)) {
                    lastNonTriviaPosition = writer.getTextPos();
                    let i = 0;
                    while (isWhiteSpaceLike(s.charCodeAt(s.length - i - 1))) {
                        i++;
                    }
                    lastNonTriviaPosition -= i;
                }
            }
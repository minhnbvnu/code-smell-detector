function skipSourceTrivia(source, pos) {
                return source.skipTrivia ? source.skipTrivia(pos) : skipTrivia(source.text, pos);
            }
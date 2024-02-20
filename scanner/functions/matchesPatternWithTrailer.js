function matchesPatternWithTrailer(target, name) {
                if (endsWith(target, "*"))
                    return false;
                const starPos = target.indexOf("*");
                if (starPos === -1)
                    return false;
                return startsWith(name, target.substring(0, starPos)) && endsWith(name, target.substring(starPos + 1));
            }
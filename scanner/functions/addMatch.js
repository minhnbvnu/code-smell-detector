function addMatch(s, p) {
                    const matchType = s === seg ? getStringLiteralType(getSourceText(s).slice(pos, p)) : getTemplateLiteralType([sourceTexts[seg].slice(pos), ...sourceTexts.slice(seg + 1, s), getSourceText(s).slice(0, p)], sourceTypes.slice(seg, s));
                    matches.push(matchType);
                    seg = s;
                    pos = p;
                }
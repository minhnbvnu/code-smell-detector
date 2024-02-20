function inferFromLiteralPartsToTemplateLiteral(sourceTexts, sourceTypes, target) {
                const lastSourceIndex = sourceTexts.length - 1;
                const sourceStartText = sourceTexts[0];
                const sourceEndText = sourceTexts[lastSourceIndex];
                const targetTexts = target.texts;
                const lastTargetIndex = targetTexts.length - 1;
                const targetStartText = targetTexts[0];
                const targetEndText = targetTexts[lastTargetIndex];
                if (lastSourceIndex === 0 && sourceStartText.length < targetStartText.length + targetEndText.length || !sourceStartText.startsWith(targetStartText) || !sourceEndText.endsWith(targetEndText))
                    return void 0;
                const remainingEndText = sourceEndText.slice(0, sourceEndText.length - targetEndText.length);
                const matches = [];
                let seg = 0;
                let pos = targetStartText.length;
                for (let i = 1; i < lastTargetIndex; i++) {
                    const delim = targetTexts[i];
                    if (delim.length > 0) {
                        let s = seg;
                        let p = pos;
                        while (true) {
                            p = getSourceText(s).indexOf(delim, p);
                            if (p >= 0)
                                break;
                            s++;
                            if (s === sourceTexts.length)
                                return void 0;
                            p = 0;
                        }
                        addMatch(s, p);
                        pos += delim.length;
                    }
                    else if (pos < getSourceText(seg).length) {
                        addMatch(seg, pos + 1);
                    }
                    else if (seg < lastSourceIndex) {
                        addMatch(seg + 1, 0);
                    }
                    else {
                        return void 0;
                    }
                }
                addMatch(lastSourceIndex, getSourceText(lastSourceIndex).length);
                return matches;
                function getSourceText(index) {
                    return index < lastSourceIndex ? sourceTexts[index] : remainingEndText;
                }
                function addMatch(s, p) {
                    const matchType = s === seg ? getStringLiteralType(getSourceText(s).slice(pos, p)) : getTemplateLiteralType([sourceTexts[seg].slice(pos), ...sourceTexts.slice(seg + 1, s), getSourceText(s).slice(0, p)], sourceTypes.slice(seg, s));
                    matches.push(matchType);
                    seg = s;
                    pos = p;
                }
            }
function tryClassifyTripleSlashComment(start, width) {
                const tripleSlashXMLCommentRegEx = /^(\/\/\/\s*)(<)(?:(\S+)((?:[^/]|\/[^>])*)(\/>)?)?/im;
                const attributeRegex = /(\s)(\S+)(\s*)(=)(\s*)('[^']+'|"[^"]+")/img;
                const text = sourceFile.text.substr(start, width);
                const match = tripleSlashXMLCommentRegEx.exec(text);
                if (!match) {
                    return false;
                }
                if (!match[3] || !(match[3] in commentPragmas)) {
                    return false;
                }
                let pos = start;
                pushCommentRange(pos, match[1].length);
                pos += match[1].length;
                pushClassification(pos, match[2].length, 10 /* punctuation */);
                pos += match[2].length;
                pushClassification(pos, match[3].length, 21 /* jsxSelfClosingTagName */);
                pos += match[3].length;
                const attrText = match[4];
                let attrPos = pos;
                while (true) {
                    const attrMatch = attributeRegex.exec(attrText);
                    if (!attrMatch) {
                        break;
                    }
                    const newAttrPos = pos + attrMatch.index + attrMatch[1].length;
                    if (newAttrPos > attrPos) {
                        pushCommentRange(attrPos, newAttrPos - attrPos);
                        attrPos = newAttrPos;
                    }
                    pushClassification(attrPos, attrMatch[2].length, 22 /* jsxAttribute */);
                    attrPos += attrMatch[2].length;
                    if (attrMatch[3].length) {
                        pushCommentRange(attrPos, attrMatch[3].length);
                        attrPos += attrMatch[3].length;
                    }
                    pushClassification(attrPos, attrMatch[4].length, 5 /* operator */);
                    attrPos += attrMatch[4].length;
                    if (attrMatch[5].length) {
                        pushCommentRange(attrPos, attrMatch[5].length);
                        attrPos += attrMatch[5].length;
                    }
                    pushClassification(attrPos, attrMatch[6].length, 24 /* jsxAttributeStringLiteralValue */);
                    attrPos += attrMatch[6].length;
                }
                pos += match[4].length;
                if (pos > attrPos) {
                    pushCommentRange(attrPos, pos - attrPos);
                }
                if (match[5]) {
                    pushClassification(pos, match[5].length, 10 /* punctuation */);
                    pos += match[5].length;
                }
                const end = start + width;
                if (pos < end) {
                    pushCommentRange(pos, end - pos);
                }
                return true;
            }
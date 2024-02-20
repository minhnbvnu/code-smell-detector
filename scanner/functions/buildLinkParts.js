function buildLinkParts(link, checker) {
            var _a2;
            const prefix = isJSDocLink(link) ? "link" : isJSDocLinkCode(link) ? "linkcode" : "linkplain";
            const parts = [linkPart(`{@${prefix} `)];
            if (!link.name) {
                if (link.text) {
                    parts.push(linkTextPart(link.text));
                }
            }
            else {
                const symbol = checker == null ? void 0 : checker.getSymbolAtLocation(link.name);
                const suffix = findLinkNameEnd(link.text);
                const name = getTextOfNode(link.name) + link.text.slice(0, suffix);
                const text = skipSeparatorFromLinkText(link.text.slice(suffix));
                const decl = (symbol == null ? void 0 : symbol.valueDeclaration) || ((_a2 = symbol == null ? void 0 : symbol.declarations) == null ? void 0 : _a2[0]);
                if (decl) {
                    parts.push(linkNamePart(name, decl));
                    if (text)
                        parts.push(linkTextPart(text));
                }
                else {
                    parts.push(linkTextPart(name + (suffix ? "" : " ") + text));
                }
            }
            parts.push(linkPart("}"));
            return parts;
        }
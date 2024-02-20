function getAttributeName(node) {
                const name = node.name;
                const text = idText(name);
                if (/^[A-Za-z_]\w*$/.test(text)) {
                    return name;
                }
                else {
                    return factory2.createStringLiteral(text);
                }
            }
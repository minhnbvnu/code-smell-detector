function getRawTextOfTemplate(node) {
            const rightShaving = isTemplateHead(node) || isTemplateMiddle(node) ? -2 : -1;
            return getTextOfNode(node).slice(1, rightShaving);
        }
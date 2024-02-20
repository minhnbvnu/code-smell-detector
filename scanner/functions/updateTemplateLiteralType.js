function updateTemplateLiteralType(node, head, templateSpans) {
                return node.head !== head || node.templateSpans !== templateSpans ? update(createTemplateLiteralType(head, templateSpans), node) : node;
            }
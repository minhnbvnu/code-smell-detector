function getTypeFromTemplateTypeNode(node) {
                const links = getNodeLinks(node);
                if (!links.resolvedType) {
                    links.resolvedType = getTemplateLiteralType([node.head.text, ...map(node.templateSpans, (span) => span.literal.text)], map(node.templateSpans, (span) => getTypeFromTypeNode(span.type)));
                }
                return links.resolvedType;
            }
function appendNode(node, html)
    {
        if (node.nodeType == 1)
        {
            html.push(
                '<div class="objectBox-element">',
                    '&lt;<span class="nodeTag">', node.nodeName.toLowerCase(), '</span>');

            for (var i = 0; i < node.attributes.length; ++i)
            {
                var attr = node.attributes[i];
                if (!attr.specified)
                    continue;
                
                html.push('&nbsp;<span class="nodeName">', attr.nodeName.toLowerCase(),
                    '</span>=&quot;<span class="nodeValue">', escapeHTML(attr.nodeValue),
                    '</span>&quot;')
            }

            if (node.firstChild)
            {
                html.push('&gt;</div><div class="nodeChildren">');

                for (var child = node.firstChild; child; child = child.nextSibling)
                    appendNode(child, html);
                    
                html.push('</div><div class="objectBox-element">&lt;/<span class="nodeTag">', 
                    node.nodeName.toLowerCase(), '&gt;</span></div>');
            }
            else
                html.push('/&gt;</div>');
        }
        else if (node.nodeType == 3)
        {
            html.push('<div class="nodeText">', escapeHTML(node.nodeValue),
                '</div>');
        }
    }
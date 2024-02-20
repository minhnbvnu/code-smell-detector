function getPureHtml(html){
        return html.replace(/<(\/?)([\w\-]+)([^>]*)>/gi, function (a, b, tagName, attrs) {
            tagName = tagName.toLowerCase();
            if ({img: 1}[tagName]) {
                return a;
            }
            attrs = attrs.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi, function (str, atr, val) {
                if ({
                    'src': 1,
                    'href': 1,
                    'name': 1
                }[atr.toLowerCase()]) {
                    return atr + '=' + val + ' '
                }
                return ''
            });
            if ({
                'span': 1,
                'div': 1
            }[tagName]) {
                return ''
            } else {

                return '<' + b + tagName + ' ' + utils.trim(attrs) + '>'
            }

        });
    }
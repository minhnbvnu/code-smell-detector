function do_md_filter_xss(html) {
    return filterXSS(html, {
        stripIgnoreTag: false,
        whiteList: {
                i: ['class', "title"],
                a: ['href', 'title', 'target'],
                img: ['src', 'alt', 'title', 'width', 'height'],
                div: ['class'],
                p: [],
                hr: [],
                h1: [], h2: [], h3: [], h4: [], h5: [], h6: [],
                ul: [], ol: [], li: [],
                code: [], pre: [], em: [], strong: [],
                blockquote: [], del: [],
                input: ['type', 'checked', 'disabled', 'class'],
                table: ['class'], thead: [], tbody: [], tr: [], th: [], td: [], br: []
            },

        onTagAttr: function (tag, name, value, isWhiteAttr) {
            if (tag === "i" && name === "class") {
                if (iClassWhiteList.indexOf(value) === -1) {
                    return false;
                } else {
                    return name + '="' + value + '"';
                }
            }
          }
        });
}
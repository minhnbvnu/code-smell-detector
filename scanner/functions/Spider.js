function Spider (htmlFiles, options) {

    options = utils.options(Spider.defaults, options);


    // 支持单个 HTML 地址传入
    if (typeof htmlFiles === 'string') {
        htmlFiles = [htmlFiles];
    }


    // 处理多个 HTML，这些 HTML 文件可能会引用相同的 CSS
    return Promise.all(htmlFiles.map(function (htmlFile) {
        return new Spider.Parser(htmlFile, options);
    })).then(function (list) {


        var webFonts = [];
        var chars = {};
        var unique = {};


        utils.reduce(list).forEach(function (font) {
            var charsCache = chars[font.id];

            if (charsCache) {

                // 合并多个页面查询到的字符
                push.apply(charsCache, font.chars);

            } else if (!unique[font.id]) {

                unique[font.id] = true;
                chars[font.id] = font.chars;

                webFonts.push(new Spider.Model(
                    font.id,
                    font.family,
                    font.files,
                    font.chars,
                    font.selectors
                ));
            }

        });

        webFonts.forEach(function (font) {

            font.chars = chars[font.id];

            // 对字符进行除重操作
            if (options.unique) {
                font.chars = utils.unique(font.chars);
            }
            

            // 对字符按照编码进行排序
            if (options.sort) {
                font.chars.sort(sort);
            }

            // 将数组转成字符串并删除无用字符
            font.chars = font.chars.join('').replace(/[\n\r\t]/g, '');
        });


        return webFonts;

        function sort (a, b) {
            return a.charCodeAt() - b.charCodeAt();
        }

    });


}
function mathPalette(configuration, fence, side) {
            if (fence === '{' || fence === '}') {
                fence = '\\' + fence;
            }
            var D = '{\\bigg' + side + ' ' + fence + '}';
            var T = '{\\big' + side + ' ' + fence + '}';
            return new TexParser_js_1.default('\\mathchoice' + D + T + T + T, {}, configuration).mml();
        }